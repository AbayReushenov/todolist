import { render, screen, fireEvent } from '@testing-library/react';
import TodoApp from './components/TodoApp';
import './setupTest';

describe('TodoApp', () => {
  test('рендерит компонент TodoApp', () => {
    render(<TodoApp />);
    const headerElement = screen.getByText(/Список задач/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('позволяет добавлять новую задачу', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('Добавить новую задачу...');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);
    const todoItem = screen.getByText('Тестовая задача');
    expect(todoItem).toBeInTheDocument();
  });

  test('позволяет отмечать задачу как выполненную', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('Добавить новую задачу...');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const todoItem = screen.getByText('Тестовая задача');
    expect(todoItem).toHaveStyle('text-decoration: line-through');
  });

  test('позволяет удалять задачу', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText('Добавить новую задачу...');
    const addButton = screen.getByText('Добавить');

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText('Тестовая задача');
    expect(todoItem).toBeInTheDocument();

    const deleteButton = screen.getByText('Удалить');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Тестовая задача')).not.toBeInTheDocument();
  });
});
