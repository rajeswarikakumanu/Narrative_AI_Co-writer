import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Wand2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatAreaProps {
  messages: Message[];
  genre: string;
  onSendMessage: (message: string) => void;
  onNewStory: () => void;
}

const genreDescriptions = {
  'Fantasy': '✨ Craft magical tales of wonder and adventure',
  'Sci-Fi': '🚀 Explore futuristic worlds and technology',
  'Horror': '👻 Create spine-chilling stories of terror',
  'Comedy': '😂 Write hilarious and entertaining narratives',
};

const randomPrompts = {
  'Fantasy': [
    'A young wizard discovers an ancient prophecy',
    'Dragons awaken after a thousand years',
    'A magical kingdom faces its greatest threat',
  ],
  'Sci-Fi': [
    'First contact with an alien civilization',
    'A space station loses communication with Earth',
    'Discovery of a new habitable planet',
  ],
  'Horror': [
    'Strange sounds coming from the basement',
    'A cursed artifact awakens something evil',
    'The town slowly disappears without a trace',
  ],
  'Comedy': [
    'A cooking disaster at a fancy restaurant',
    'An accidental time machine malfunction',
    'A superhero with completely useless powers',
  ],
};

export default function ChatArea({
  messages,
  genre,
  onSendMessage,
  onNewStory,
}: ChatAreaProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setIsLoading(true);
      onSendMessage(input);
      setInput('');
      setTimeout(() => setIsLoading(false), 700);
    }
  };

  const handleRandomPrompt = () => {
    const prompts = randomPrompts[genre as keyof typeof randomPrompts];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setInput(randomPrompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-white/20 text-white">
        <h1 className="text-4xl font-bold mb-2">📖 Narrative Story Co-Writer</h1>
        <p className="text-lg text-white/80">{genreDescriptions[genre as keyof typeof genreDescriptions]}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <Wand2 className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white/80 mb-2">Start Your Story</h2>
              <p className="text-white/60 max-w-md">
                Enter a prompt below to begin creating an amazing {genre.toLowerCase()} narrative with AI assistance.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                  <p className="font-semibold mb-1">
                    {message.type === 'user' ? 'You' : 'AI Co-Writer'}
                  </p>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className={`text-xs mt-2 block ${
                    message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start fade-in">
                <div className="chat-bubble-ai">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your story prompt..."
                className="input-field resize-none text-gray-900 h-20"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute bottom-3 right-3 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleRandomPrompt}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-all"
            >
              🎲 Random Prompt
            </button>
            <button
              onClick={onNewStory}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-all"
            >
              <Plus className="w-4 h-4" /> New Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
