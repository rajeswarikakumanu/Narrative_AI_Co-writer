import { useState } from 'react';
import { LogOut, Plus, Trash2, Settings, Send, BookOpen } from 'lucide-react';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user: string) => {
    setUsername(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
  };

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <ChatPage username={username} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
