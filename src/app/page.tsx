"use client";

import Container from "@/components/ui/container";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Plus } from "lucide-react";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const getTodoItems = JSON.parse(localStorage.getItem("todo-items") || "[]");
    setTodos(getTodoItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(todos));
  }, [todos]);

  function handleAddItems() {
    if (inputValue.trim() !== "") {
      setTodos([...todos, inputValue]);
      setInputValue("");
    }
  }

  function handleRemoveItem(index: number) {
    const updatedItems = todos.filter((_, i) => i !== index);
    setTodos(updatedItems);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAddItems();
    }
  }

  function handleRemoveAll() {
    setTodos([]);
  }

  return (
    <Container className="min-h-screen">
      <div className="mx-auto mt-24 max-w-lg">
        <h1 className="text-3xl font-semibold ">Must Do</h1>
        <p className="mt-2 text-neutral-400">
          An app that transforms your procrastination into a to-do celebration!
        </p>

        <div className="mt-5">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Buy flowers "
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <Button className="aspect-square w-14" onClick={handleAddItems}>
              <Plus />
            </Button>
          </div>
          {todos.length > 0 ? (
            <Button
              className="mt-3 w-full  bg-red-500/70"
              onClick={handleRemoveAll}
            >
              Remove All
            </Button>
          ) : null}
        </div>

        <div className="mt-10">
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
                  <li className="flex items-center justify-center">
                    <ChevronRight />
                    <span>{item}</span>
                  </li>
                  <Button
                    className="text-red-400"
                    variant="link"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </Button>
                </ul>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Container>
  );
}
