import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Github, Cpu, Globe, Linkedin } from 'lucide-react';
import data from '../data.json';

interface HistoryItem {
  type: 'cmd' | 'resp';
  content: string | React.ReactNode;
}

const Typewriter = ({ text, delay = 20 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayedText}</span>;
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    window.addEventListener('click', focusInput);
    return () => window.removeEventListener('click', focusInput);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newEntry: HistoryItem = { type: 'cmd', content: input };
    const currentHistory = [...history, newEntry];

    let response: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        response = 'Available commands: about, experience, projects, social, clear, help';
        break;
      case 'about':
        response = data.commands.about;
        break;
      case 'experience':
        response = (
          <div className="flex flex-col gap-4">
            {data.commands.experience.map((exp, i) => (
              <div key={i} className="border-l-2 border-green-800 pl-4">
                <div className="text-green-400 font-bold">
                  <Typewriter text={`${exp.role} @ ${exp.company}`} delay={10} />
                </div>
                <div className="text-xs text-green-600 mb-1">
                  <Typewriter text={exp.period} delay={5} />
                </div>
                <ul className="list-disc ml-4 text-sm text-green-300">
                  {exp.description.map((desc, j) => (
                    <li key={j}>
                      <Typewriter text={desc} delay={5} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
        break;
      case 'projects':
        response = (
          <ul className="list-disc ml-6">
            {data.commands.projects.map((p: any, i: number) => (
              <li key={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-400"
                >
                  <Typewriter text={p.name} delay={15} />
                </a>
              </li>
            ))}
          </ul>
        );
        break;
      case 'social':
        response = (
          <div className="flex flex-col gap-2">
            {data.commands.social.map((s: any, i: number) => (
              <div key={i} className="flex items-center gap-2">
                {s.name.toLowerCase() === 'github' ? <Github size={16} /> : <Linkedin size={16} />}
                <span className="text-green-500 font-bold">{s.name}:</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-400 text-sm"
                >
                  <Typewriter text={s.url} delay={10} />
                </a>
              </div>
            ))}
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory([...currentHistory, { type: 'resp', content: response }]);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="h-[100dvh] w-screen bg-black text-green-400 p-4 md:p-6 flex flex-col font-mono relative overflow-hidden text-xs md:text-base selection:bg-green-900 selection:text-green-100"
    >
      <div className="crt-overlay pointer-events-none" />

      {/* Header */}
      <div className="mb-4 border-b border-green-900 pb-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="md:w-5 md:h-5" />
          <span className="font-bold uppercase tracking-widest text-[10px] md:text-sm truncate max-w-[150px] md:max-w-none">
            {data.username}@OS
          </span>
        </div>
        <div className="flex gap-2 md:gap-4 text-[8px] md:text-xs opacity-50">
          <span className="flex items-center gap-1"><Cpu size={10} className="md:w-3 md:h-3" /> STABLE</span>
          <span className="hidden xs:flex items-center gap-1"><Globe size={10} className="md:w-3 md:h-3" /> 24ms</span>
        </div>
      </div>

      {/* Greeting */}
      <div className="mb-4 shrink-0 overflow-hidden">
        <div className="break-words">
          <Typewriter text={`Welcome, user. Terminal initialized for ${data.username}.`} />
        </div>
        <div className="mt-1 break-words opacity-80">
          <Typewriter text={data.bio} delay={10} />
        </div>
        <div className="mt-2 text-[10px] md:text-xs opacity-60 italic underline decoration-green-900/50">
          Type 'help' to see available commands.
        </div>
      </div>

      {/* History */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-4 scrollbar-hide break-words"
      >
        {history.map((item, i) => (
          <div key={i} className="mb-3 md:mb-2 text-sm md:text-base">
            {item.type === 'cmd' ? (
              <div className="flex gap-2">
                <span className="text-blue-400 shrink-0">guest@terminal:~$</span>
                <span className="flex-1">{item.content}</span>
              </div>
            ) : (
              <div className="text-green-300 ml-2 md:ml-4 mt-1 border-l border-green-900/30 pl-3 md:pl-0 md:border-none">
                {typeof item.content === 'string' ? (
                  <Typewriter text={item.content} delay={5} />
                ) : (
                  item.content
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleCommand} className="flex gap-2 items-center shrink-0 border-t border-green-900/20 pt-2 pb-1">
        <span className="text-blue-400 shrink-0 text-xs md:text-base">guest@terminal:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none flex-1 text-green-400 text-xs md:text-base min-w-0"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <div className="cursor shrink-0" />
      </form>
    </motion.div>
  );
};

export default Terminal;
