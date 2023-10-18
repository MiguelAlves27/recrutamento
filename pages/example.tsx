import { useTodo } from "@/lib/frontend/hooks";
import { Button } from "@mantine/core";
import { useState } from "react";

export default function Todo() {
  const { todos, addTodo, removeTodo } = useTodo(["Todo #1", "Todo #2", "Todo #3"]);

  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addTodo(newTask); 
      setNewTask("");
    }
  };

  const handleDelete = (index) => {
    removeTodo(index);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTask(todos[index]);
  };

  const handleSaveEdit = (index) => {
    todos[index] = editedTask;
    setEditIndex(-1);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="h-fit w-2/3 rounded-lg border">
        <div className="h-16 p-4 border-b flex flex-row items-center">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Nova tarefa"
          />
          <Button onClick={handleAddTask}>Adicionar</Button>
        </div>
        <div className="h-96 p-4 flex flex-col gap-2 overflow-y-scroll">
          {todos.map((todo, index) => (
            <div
              key={index}
              className="w-full border rounded-lg flex flex-row items-center justify-between p-4"
            >
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <Button bg="green" onClick={() => handleSaveEdit(index)}>Salvar</Button>
                </>
              ) : (
                <h2 className="text-xl font-semibold">{todo}</h2>
              )}
              {editIndex === index ? null : (
                <Button bg="blue" onClick={() => handleEdit(index)}>Editar</Button>
              )}
              {editIndex === index ? null : (
                <Button bg="red" onClick={() => handleDelete(index)}>Excluir</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
