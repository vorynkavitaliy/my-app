import React, { useRef, useState, useEffect } from "react";
import EmojiPicker, {
  SkinTonePickerLocation,
  SuggestionMode,
  Theme,
} from "emoji-picker-react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  loading: boolean;
  onSendMessage: (message: string) => void;
}

function TypingComponent({ loading, onSendMessage, ...rest }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>(""); // Состояние для текста
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false); // Показывать или скрывать эмодзи

  // Обработчик ввода текста
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value); // Сохраняем текст в стейт
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const maxHeight = 150;
      const scrollHeight = textareaRef.current.scrollHeight;

      if (scrollHeight > maxHeight) {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = "scroll";
      } else {
        textareaRef.current.style.height = `${scrollHeight}px`;
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  };

  // Обработчик выбора эмоджи
  const handleEmojiClick = (emojiData: any) => {
    setText((prevText) => prevText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSendMessage = () => {
    if (text) {
      onSendMessage(text);
      setText("");
    }
  };

  return (
    <div
      {...rest}
      className={`flex items-center w-full` + " " + rest.className}
    >
      <div className="flex items-center flex-1 px-4 py-2 rounded-sm bg-gray-800 mr-2 relative">
        <button
          className="p-1 mb-auto mr-2 cursor-pointer"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          style={{
            background: "transparent",
            border: "none",
          }}
        >
          😊
        </button>
        {showEmojiPicker && (
          <EmojiPicker
            open={showEmojiPicker}
            theme={Theme.DARK}
            reactions={[""]}
            searchDisabled
            suggestedEmojisMode={SuggestionMode.RECENT}
            skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
            height={"250px"}
            width={"300px"}
            className="!absolute top-0 left-0 transform -translate-y-full"
            onEmojiClick={handleEmojiClick} // При клике на эмоджи
          />
        )}

        <textarea
          ref={textareaRef}
          className="outline-0 placeholder:text-gray-400 flex-1 resize-none bg-transparent text-text h-auto overflow-hidden"
          placeholder="Type your message please..."
          value={text} // Привязка текстового значения к стейту
          onChange={handleInput} // Обработчик для ввода
        />
      </div>
      <button
        className={`px-8 py-2 rounded-sm ml-auto mb-auto bg-tertiary text-text ${
          loading && "bg-gray-600 pointer-events-none opacity-50"
        }`}
        onClick={handleSendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default TypingComponent;
