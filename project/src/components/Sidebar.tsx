import { LogOut, Trash2, Plus } from 'lucide-react';

interface SidebarProps {
  username: string;
  genre: string;
  onGenreChange: (genre: 'Fantasy' | 'Sci-Fi' | 'Horror' | 'Comedy') => void;
  stories: Array<{ id: string; title: string; genre: string; createdAt: Date }>;
  currentStoryId: string | null;
  onSelectStory: (id: string) => void;
  onDeleteStory: (id: string) => void;
  onLogout: () => void;
}

const genreEmojis = {
  'Fantasy': '🏰',
  'Sci-Fi': '🚀',
  'Horror': '👻',
  'Comedy': '😂',
};

export default function Sidebar({
  username,
  genre,
  onGenreChange,
  stories,
  currentStoryId,
  onSelectStory,
  onDeleteStory,
  onLogout,
}: SidebarProps) {
  const genres: ('Fantasy' | 'Sci-Fi' | 'Horror' | 'Comedy')[] = ['Fantasy', 'Sci-Fi', 'Horror', 'Comedy'];

  return (
    <div className="w-80 bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4">
          <h2 className="font-bold text-lg">👤 {username}</h2>
          <p className="text-sm text-white/80">Story Co-Writer</p>
        </div>
      </div>

      {/* Settings */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          ⚙️ Genre Settings
        </h3>
        <select
          value={genre}
          onChange={(e) => onGenreChange(e.target.value as any)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900 font-medium"
        >
          {genres.map(g => (
            <option key={g} value={g}>{genreEmojis[g as keyof typeof genreEmojis]} {g}</option>
          ))}
        </select>
        <div className="mt-3 p-2 bg-gray-100 rounded-lg text-sm text-gray-700 text-center">
          Current: <strong>{genreEmojis[genre as keyof typeof genreEmojis]} {genre}</strong>
        </div>
      </div>

      {/* Story History */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <h3 className="font-bold text-gray-900 mb-3">📚 Story History</h3>
        <div className="space-y-2">
          {stories.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-8">
              <p>No stories yet</p>
              <p className="text-xs text-gray-400">Start creating!</p>
            </div>
          ) : (
            stories.map(story => (
              <div
                key={story.id}
                className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all fade-in ${
                  currentStoryId === story.id
                    ? 'bg-blue-50 border-blue-500 shadow-md'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => onSelectStory(story.id)}
              >
                <p className="font-semibold text-gray-900 text-sm truncate">
                  {genreEmojis[story.genre as keyof typeof genreEmojis]} {story.title}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(story.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteStory(story.id);
                  }}
                  className="mt-2 btn-danger text-xs w-full flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-2 text-center text-xs text-gray-500 border-t border-gray-200">
        <p>Story Co-Writer v1.0</p>
      </div>
    </div>
  );
}
