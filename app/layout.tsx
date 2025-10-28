import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Chat Bot",
  description: "AI powered chat bot with beautiful UI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
