'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, ChevronLeft, Phone, Video, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

export default function MobileChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey, I wanted to ask about building our new mobile application.', sender: 'user', timestamp: '12:00 PM' },
    { id: '2', text: 'Hey! We can definitely help. We build high-performance React Native and native Swift apps. What does your project entail?', sender: 'agent', timestamp: '12:01 PM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    
    // Simulate agent reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "That sounds like an amazing app. We can build this using a cross-platform stack to launch on iOS & Android in under 8 weeks.",
        "We support native features like push notifications, offline syncing, and secure token storages.",
        "Our engineers prioritize 60FPS fluid screen transitions using native hardware engines.",
      ];
      const randomReply = responses[Math.floor(Math.random() * responses.length)];
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomReply,
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, agentMessage]);
    }, 1200);
  };

  return (
    <div className="h-full min-h-screen bg-[#0C0D0F] text-[#EDEEF0] flex flex-col justify-between select-none font-sans overflow-hidden border border-neutral-900">
      {/* Mobile Nav Header */}
      <div className="bg-[#14161A] border-b border-neutral-900 px-4 pt-8 pb-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2">
          <ChevronLeft size={16} className="text-[#34D399] cursor-pointer" />
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#34D399] flex items-center justify-center text-black font-bold font-mono text-xs">
              Æ
            </div>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full absolute bottom-0 right-0 border-2 border-[#14161A]" />
          </div>
          <div>
            <div className="text-xs font-bold font-mono flex items-center gap-1">
              <span>Nova AI Studio</span>
              <ShieldCheck size={11} className="text-[#34D399]" />
            </div>
            <span className="text-[9px] text-[#34D399]">Online / Active</span>
          </div>
        </div>
        <div className="flex gap-3 text-neutral-400">
          <Phone size={13} className="cursor-pointer hover:text-white" />
          <Video size={13} className="cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-3 flex flex-col scrollbar-none text-[11px]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`max-w-[80%] p-3 rounded-2xl leading-relaxed transition-all ${
                isUser
                  ? 'bg-[#34D399] text-black self-end rounded-tr-none'
                  : 'bg-[#1B1E23] text-neutral-200 self-start rounded-tl-none border border-neutral-900'
              }`}
            >
              <p>{msg.text}</p>
              <span className={`text-[8px] block mt-1 text-right ${isUser ? 'text-black/50' : 'text-neutral-500'}`}>
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="bg-[#1B1E23] text-neutral-300 self-start rounded-2xl rounded-tl-none p-3 max-w-[80%] flex items-center gap-1.5 border border-neutral-900">
            <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-[#34D399] rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Area */}
      <form onSubmit={handleSend} className="bg-[#14161A] p-3 border-t border-neutral-900 flex gap-2 items-center shrink-0">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Message Nova Studio..."
          className="flex-grow bg-[#0C0D0F] border border-neutral-800 focus:border-[#34D399] rounded-full px-4 py-2 text-xs focus:outline-none text-[#EDEEF0] transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-8 h-8 rounded-full bg-[#34D399] disabled:bg-neutral-800 disabled:text-neutral-600 text-black flex items-center justify-center transition-colors cursor-pointer"
        >
          <Send size={12} />
        </button>
      </form>
    </div>
  );
}
