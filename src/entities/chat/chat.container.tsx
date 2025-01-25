"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

import Message from "./components/message.component";
import TypingComponent from "./components/typing.component";
import OpenAI from "../../clients/gpt.client";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const ChatContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const onHandleSendMessage = async (message: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: message }],
        }),
        method: "POST",
      });

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        data.choices[0].message as ChatCompletionMessageParam,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useLayoutEffect(() => {
    fetch("/api/chat", {
      body: JSON.stringify({ messages }),
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          data.choices[0].message as ChatCompletionMessageParam,
        ]);
      });
  }, []);
  return (
    <div className="max-w-[800px] w-full mx-auto flex flex-col h-full py-4 px-2">
      <div>
        <img src="/teacer.jpg" alt="teacer" />
      </div>

      <div
        ref={scrollRef}
        className="flex flex-col h-full p-4 space-y-4 overflow-auto max-h-[45vh] mt-auto "
      >
        {messages.map(
          (message, index) =>
            message.role !== "system" && (
              <Message
                key={index}
                loading={loading}
                message={message.content as string}
                role={message.role}
              />
            )
        )}
      </div>

      <TypingComponent
        className="mt-4"
        loading={loading}
        onSendMessage={onHandleSendMessage}
      />
    </div>
  );
};

export default ChatContainer;
