# Testing Guidelines

## Testing Framework

- Use `Jest` or `Vitest` for unit and integration tests.
- Use `Testing Library` (React Testing Library) for component testing.
- Include coverage reports and snapshot testing for UI components.

## Testing Strategy

- **Unit Tests:** Test business logic in services and utils.
- **Integration Tests:** Test component interactions and API integrations.
- **Mock Management:** Mock dependencies using `ts-mockito` or `jest.mock` for unit tests.
- **Mock Data:** Separate mock data into `src/__mock__` directory.

## Best Practices

- **Avoid Nesting:** Avoid nesting test cases - keep tests flat and focused.
- **Descriptive Names:** Use clear, descriptive test names that explain what is being tested.
- **Arrange-Act-Assert:** Follow the AAA pattern in test structure.
- **Test Behavior:** Test behavior and outcomes, not implementation details.
- **Isolated Tests:** Each test should be independent and not rely on other tests.

## Component Testing

```typescript
// Example component test structure
describe('UserCard Component', () => {
  it('should display user name and email', () => {
    // Arrange
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };

    // Act
    render(<UserCard user={mockUser} onEdit={jest.fn()} />);

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
```

## API Testing

- Test API routes with proper error handling scenarios.
- Mock external dependencies and services.
- Test both success and error responses.
- Validate request/response types match TypeScript definitions.
