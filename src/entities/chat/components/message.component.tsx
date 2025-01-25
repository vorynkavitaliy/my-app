import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  message: string;
  role: string;
  loading: boolean;
}

const MessageComponent = ({ message, role, loading, ...rest }: Props) => {
  return (
    <div
      // {...rest}
      className={`px-4 py-3 rounded-b-md max-w-2xl text-text ${
        role === "assistant"
          ? "rounded-tl-md ml-auto bg-tertiary"
          : "rounded-tr-md mr-auto bg-secondary"
      } ${rest.className}`}
    >
      {message}
    </div>
  );
};

export default MessageComponent;
