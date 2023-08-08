import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const TodoItem = ({ id, text, index, moveTodo }) => {
  const [, drag] = useDrag({
    type: 'TODO',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'TODO',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        console.log("Dragging in process "+draggedItem);
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
        console.log("Dragging is completed "+draggedItem);
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ padding: '8px', border: '1px solid #ccc' }}>
      {text}
    </div>
  );
};

const TodoList = ({ todos }) => {
  const [todoList, setTodoList] = useState(todos);

  const moveTodo = (fromIndex, toIndex) => {
    const updatedList = [...todoList];
    const [movedTodo] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedTodo);
    setTodoList(updatedList);
  };

  return (
    <div>
      {todoList.map((todo, index) => (
        <TodoItem key={todo.id} id={todo.id} text={todo.text} index={index} moveTodo={moveTodo} />
      ))}
    </div>
  );
};

const Card = () => {
  const todos = [
    { id: 1, text: 'Buy groceries' },
    { id: 2, text: 'Pay bills' },
    { id: 3, text: 'Walk the dog' },
  ];

  return <TodoList todos={todos} />;
};

export default Card;
