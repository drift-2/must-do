"use client";

import Container from "@/components/ui/container";
import moment from "moment";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Todo } from "@/lib/types";

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    const getTodoItems = JSON.parse(localStorage.getItem("todo-items") || "[]");
    if (getTodoItems.length > 0) {
      setTodos(getTodoItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    if (todoInput !== "") {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          todoItem: todoInput,
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setTodoInput("");
    }
  }

  function handleRemoveTodo(id: string) {
    setTodos(todos.filter((item) => item.id !== id));
  }

  function handleCompleteTodoItem(id: string, completed: boolean) {
    setTodos(
      todos.map((item) => (item.id === id ? { ...item, completed } : item)),
    );
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  }

  function handleRemoveAll() {
    setTodos([]);
  }

  return (
    <>
      <div className="sticky top-0 z-40 rounded-md bg-transparent pb-5 pt-20 backdrop-blur-2xl">
        <Container>
          <h1 className="text-3xl font-semibold">Must Do</h1>
          <p className="mt-2 text-neutral-400">
            An app that transforms your procrastination into a to-do
            celebration!
          </p>

          <div className="mt-5">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Buy flowers "
                value={todoInput}
                onChange={(event) => {
                  setTodoInput(event.target.value);
                }}
                onKeyDown={handleKeyDown}
              />
              <Button className="aspect-square w-14" onClick={handleAddTodo}>
                <Plus />
              </Button>
            </div>
            {todos.length > 0 && (
              <Button
                className="mt-3 w-full bg-red-500/70"
                onClick={handleRemoveAll}
              >
                Remove All
              </Button>
            )}
          </div>
        </Container>
      </div>

      <Container className="mt-5 pb-10">
        {todos.length === 0 ? (
          <p className="mt-3 text-neutral-400">No items added yet.</p>
        ) : (
          <ul className="mt-2">
            <h1 className="text-xl font-semibold">Added Items</h1>
            {todos.map((item, index) => (
              <ul
                key={index}
                className="mt-3 flex items-center justify-between rounded-2xl bg-card px-4 py-2"
              >
                <li className="flex items-center justify-center gap-2">
                  <Checkbox
                    onClick={() =>
                      handleCompleteTodoItem(item.id, !item.completed)
                    }
                  />
                  <span
                    className={cn(
                      item.completed && "text-neutral-500 line-through",
                    )}
                  >
                    {item.todoItem}
                  </span>
                </li>

                <div>
                  {!item.completed && (
                    <span className="text-xs font-semibold text-neutral-500">
                      Added: {moment(item.createdAt).fromNow()}
                    </span>
                  )}
                  <Button
                    className="text-red-400"
                    variant="link"
                    onClick={() => handleRemoveTodo(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </ul>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
