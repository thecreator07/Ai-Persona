"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { personaOptions, personas } from "@/lib/persona";
import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "@/src/components/ui/aurora-background";

// import { AuroraBackground } from "../ui/aurora-background";
export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState("tony");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, persona }),
      });

      const data = await res.json();

      if (data?.content) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.content },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: "Error: No response" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong" },
      ]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [persona]);
  return (
    <AuroraBackground className="">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 overflow-y-auto hide-scrollbar"
      >
        <div className="max-w-2xl h-full mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Persona AI</h1>
          <div className="mb-4">
            <Select
              onValueChange={(value) => setPersona(value)}
              defaultValue="tony"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Persona" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Persona</SelectLabel>
                  {personaOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {personas[option].name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 mb-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3  ${
                  msg.role === "user" ? "pl-3 ml-10 " : "pr-3 mr-10"
                } rounded-lg ${
                  msg.role === "user"
                    ? "bg-green-100 text-right"
                    : "bg-slate-200 text-left"
                }`}
              >
                <strong>{msg.role === "user" ? "You" : persona}:</strong>{" "}
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="text-black-500">{persona} is thinking...</div>
            )}
          </div>

          <div className="flex gap-2 pb-2.5">
            <Input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </Button>
          </div>
        </div>
        <div ref={bottomRef} />
      </motion.div>
    </AuroraBackground>
  );
}
