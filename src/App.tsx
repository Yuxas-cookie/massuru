import React from 'react';
import { ChatInterface } from './components/ChatInterface';
import { ThemeProvider } from './contexts/ThemeContext';
import { Dumbbell } from 'lucide-react';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white text-gray-800 flex flex-col">
        <header className="py-4 border-b border-blue-100 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold flex items-center justify-center">
              <Dumbbell className="w-8 h-8 text-white mr-2 animate-bounce" />
              <span className="text-white font-extrabold tracking-wider">
                Muscle Coach AI
              </span>
            </h1>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto px-4 py-6">
          <ChatInterface />
        </main>
        
        <footer className="py-4 border-t border-blue-100 text-white text-sm text-center bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          <div className="container mx-auto px-4">
            <p className="font-medium">Muscle Coach AI © 2025 | あなたの理想の体づくりをサポート</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;