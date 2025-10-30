import React, { useRef, useState } from 'react'
import ExportIcon from '@/components/icons/ExportIcon'
import ImportIcon from '@/components/icons/ImportIcon'
import {
  downloadChatHistory,
  importChatHistory,
  readFileContent,
} from '@/utils/chatHistory'
import { Message } from '@/types/message'
import { useToast } from '@/context/ToastProvider'
import logger from '@/utils/logger'

interface ExportImportPanelProps {
  messages: Message[]
  userName: string
  onImportHistory: (messages: Message[]) => void
}

const ExportImportPanel: React.FC<ExportImportPanelProps> = ({
  messages,
  userName,
  onImportHistory,
}) => {
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showSuccess, showError } = useToast()

  const handleExport = () => {
    try {
      downloadChatHistory(messages, userName)
      showSuccess(
        'Export Successful',
        'Chat history has been exported successfully'
      )
    } catch (error) {
      logger.error('Export failed:', error)
      showError(
        'Export Failed',
        'Failed to export chat history. Please try again.'
      )
    }
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)

    try {
      // Validate file type
      if (!file.name.endsWith('.json')) {
        throw new Error('Please select a JSON file')
      }

      // Read and parse file
      const content = await readFileContent(file)
      const result = importChatHistory(content)

      if (!result.success) {
        throw new Error(result.error || 'Failed to import chat history')
      }

      if (result.messages) {
        onImportHistory(result.messages)
        showSuccess(
          'Import Successful',
          `Successfully imported ${result.messages.length} message${result.messages.length !== 1 ? 's' : ''}`
        )
        logger.info(`Successfully imported ${result.messages.length} messages`)
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to import chat history'
      showError('Import Failed', errorMessage)
      logger.error('Import failed:', error)
    } finally {
      setIsImporting(false)
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Export Button */}
      <button
        onClick={handleExport}
        className="px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center gap-2"
        title="Export chat history"
        disabled={messages.length === 0}
      >
        <ExportIcon size={16} />
        <span className="hidden sm:inline">Export</span>
      </button>

      {/* Import Button */}
      <button
        onClick={handleImportClick}
        className="px-3 py-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors flex items-center gap-2"
        title="Import chat history"
        disabled={isImporting}
      >
        <ImportIcon size={16} />
        <span className="hidden sm:inline">
          {isImporting ? 'Importing...' : 'Import'}
        </span>
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}

export default ExportImportPanel
