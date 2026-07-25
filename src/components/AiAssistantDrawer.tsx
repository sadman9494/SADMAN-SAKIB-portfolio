import React, { useState, useEffect, useRef } from 'react';
import { X, Bot, Send, Sparkles, User, RefreshCw, Terminal } from 'lucide-react';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am SS ARCHITECT AI, Sadman Sakib's official AI assistant twin. How can I assist you with Sadman's experience, research, or system architecture case studies today?",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: promptText };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: promptText }),
      });

      const data = await response.json();
      const replyText = data.reply || "I'm happy to help answer any questions about Sadman Sakib's architectural portfolio!";

      setMessages((prev) => [...prev, { role: 'assistant', content: replyText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sadman Sakib is a Software Engineer & AI Consultant (CGPA 3.95 Gold Medalist) specializing in PyTorch AI, Hyperledger Fabric, and .NET Core 8 microservices. Feel free to explore his case studies in the portfolio above!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendPrompt(inputVal);
  };

  const presetQuestions = [
    "Tell me about Project Kronos",
    "What is Sadman's academic record?",
    "What blockchain projects has he built?",
    "How do I hire Sadman?",
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-[#0c0c0f] border-l border-[#27272a] shadow-2xl flex flex-col font-sans">
      
      {/* Drawer Header */}
      <div className="p-4 bg-[#121215] border-b border-[#27272a] flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-[#a78bfa] flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-mono font-bold text-white text-sm">
              SS ARCHITECT AI Twin
            </h3>
            <p className="text-[10px] text-[#34d399] font-mono flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
              <span>Powered by Gemini 2.5 Flash</span>
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#27272a]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Preset Pills */}
      <div className="p-3 bg-[#09090b] border-b border-[#27272a] flex items-center space-x-2 overflow-x-auto shrink-0 font-mono text-[11px]">
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(q)}
            className="px-2.5 py-1 rounded bg-[#121215] hover:bg-[#18181c] border border-[#27272a] text-[#a78bfa] whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Chat Feed */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs text-left">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2.5 ${
              m.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-[#a78bfa] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`p-3.5 rounded-xl max-w-[85%] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#a78bfa] text-[#09090b] font-medium rounded-tr-none'
                  : 'bg-[#121215] border border-[#27272a] text-white rounded-tl-none font-sans'
              }`}
            >
              {m.content}
            </div>

            {m.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-[#27272a] text-white flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-[#a78bfa] font-mono text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Analyzing architectural database...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#121215] border-t border-[#27272a] flex items-center space-x-2 shrink-0">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask AI about Sadman's stack, roles, or publications..."
          className="flex-1 bg-[#09090b] border border-[#27272a] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#a78bfa]"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 rounded-lg bg-[#a78bfa] text-[#09090b] font-bold hover:bg-[#b8a1ff] disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
