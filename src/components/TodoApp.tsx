import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';

// Определяем интерфейс для элемента задачи
interface ITodoItem {
  id: string;
  text: string;
  completed: boolean;
}

// Определяем типы фильтров
type FilterType = 'all' | 'active' | 'completed';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  // Добавление новой задачи
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newId = crypto.randomUUID();
      const newTodoItem: ITodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  // Удаление задачи по id
  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Переключение статуса выполнения задачи
  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  // Фильтрация задач по статусу
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  // Обработка нажатия Enter для добавления задачи
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-app">
      <h1>Список задач</h1>

      <div className="add-todo">
        <input
          type="text"
          placeholder="Добавить новую задачу..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTodo}>Добавить</button>
      </div>

      <TodoFilter
        filter={filter}
        setFilter={setFilter}
        todosCount={{
          all: todos.length,
          active: todos.filter(t => !t.completed).length,
          completed: todos.filter(t => t.completed).length
        }}
      />

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
