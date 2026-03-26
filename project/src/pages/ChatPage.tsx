import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

interface ChatPageProps {
  username: string;
  onLogout: () => void;
}

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface Story {
  id: string;
  title: string;
  genre: string;
  messages: Message[];
  createdAt: Date;
}

export default function ChatPage({ username, onLogout }: ChatPageProps) {
  const [genre, setGenre] = useState<'Fantasy' | 'Sci-Fi' | 'Horror' | 'Comedy'>('Fantasy');
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      title: 'The Dragon\'s Quest',
      genre: 'Fantasy',
      messages: [],
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      title: 'Space Station Alpha',
      genre: 'Sci-Fi',
      messages: [],
      createdAt: new Date(Date.now() - 172800000),
    },
  ]);
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const getThemeClass = () => {
    const themes = {
      'Fantasy': 'fantasy-theme',
      'Sci-Fi': 'scifi-theme',
      'Horror': 'horror-theme',
      'Comedy': 'comedy-theme',
    };
    return themes[genre];
  };

  const handleSendMessage = (prompt: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    const aiResponses = {
      'Fantasy': `In a realm where magic weaves through every breath, ${prompt.toLowerCase()} unfolds. The ancient dragons stirred from their slumber, sensing a disturbance in the mystical energies. Our hero, armed with nothing but courage and an enchanted blade, must face the darkness that threatens to consume all...`,
      'Sci-Fi': `Year 2847. ${prompt} The quantum processors hummed as the AI collective processed the anomaly. Captain Rivera stared at the holographic display, realizing that humanity's fate depended on the next decision. The wormhole generator was their only hope, but the calculations showed a 32% chance of survival...`,
      'Horror': `The shadows grew longer as night fell. ${prompt} The old house had stood empty for decades, its walls whispering secrets that no living soul should hear. Blood-curdling screams echoed through the halls, and the temperature dropped to freezing. Whatever lurked in the darkness was no longer content to stay hidden...`,
      'Comedy': `${prompt} But things didn't go quite as planned! Instead of the elegant entrance they rehearsed, Bob slipped on a banana peel (yes, really!) and crashed into the wedding cake. The crowd gasped, then burst into laughter as he emerged covered in frosting, striking a pose and declaring, 'I meant to do that!'`,
    };

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponses[genre],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);

      if (!currentStoryId) {
        const newStory: Story = {
          id: Date.now().toString(),
          title: prompt.substring(0, 30) + (prompt.length > 30 ? '...' : ''),
          genre,
          messages: [userMessage, aiMessage],
          createdAt: new Date(),
        };
        setStories(prev => [newStory, ...prev]);
        setCurrentStoryId(newStory.id);
      }
    }, 600);
  };

  const handleDeleteStory = (id: string) => {
    setStories(prev => prev.filter(story => story.id !== id));
    if (currentStoryId === id) {
      setCurrentStoryId(null);
      setMessages([]);
    }
  };

  const handleNewStory = () => {
    setMessages([]);
    setCurrentStoryId(null);
  };

  return (
    <div className={`${getThemeClass()} min-h-screen flex transition-all duration-500`}>
      <Sidebar
        username={username}
        genre={genre}
        onGenreChange={setGenre}
        stories={stories}
        currentStoryId={currentStoryId}
        onSelectStory={(id) => {
          setCurrentStoryId(id);
          const story = stories.find(s => s.id === id);
          setMessages(story?.messages || []);
        }}
        onDeleteStory={handleDeleteStory}
        onLogout={onLogout}
      />
      <ChatArea
        messages={messages}
        genre={genre}
        onSendMessage={handleSendMessage}
        onNewStory={handleNewStory}
      />
    </div>
  );
}
