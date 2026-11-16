import React, { useState, useMemo } from 'react';
import { CARDS } from './data/cards';
import { CHARACTERS } from './data/characters';
import { Navbar } from './components/Navbar';
import { CardDeck } from './components/CardDeck';
import { CategoriesFilter } from './components/CategoriesFilter';
import { BuzzerModal } from './components/BuzzerModal';
import { CharactersModal } from './components/CharactersModal';
import { PlayerSetup } from './components/PlayerSetup';
import { Sparkles, Dices, AlertCircle, Info } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isBuzzerOpen, setIsBuzzerOpen] = useState(false);
  const [isCharactersOpen, setIsCharactersOpen] = useState(false);
  const [isPlayersOpen, setIsPlayersOpen] = useState(false);

  // Initial Players with Karla, Paulina & Natalia
  const [players, setPlayers] = useState([
    { id: '1', name: 'Karla', avatar: '/images/carla.jpg', drinksCount: 0 },
    { id: '2', name: 'Paulina', avatar: '/images/paulina.jpg', drinksCount: 0 },
    { id: '3', name: 'Natalia', avatar: '/images/natalia.jpg', drinksCount: 0 }
  ]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

  // Filtered Cards
  const filteredCards = useMemo(() => {
    if (activeCategory === 'all') return CARDS;
    return CARDS.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const currentCard = filteredCards[currentCardIndex % filteredCards.length];
  const currentPlayer = players[currentTurnIndex % players.length];

  const handleNextCard = () => {
    // Next random or sequential card
    setCurrentCardIndex(prev => (prev + 1) % filteredCards.length);
    // Next player turn
    setCurrentTurnIndex(prev => (prev + 1) % players.length);
  };

  const handleAddDrink = () => {
    setPlayers(prev => prev.map((p, idx) => {
      if (idx === currentTurnIndex % prev.length) {
        return { ...p, drinksCount: (p.drinksCount || 0) + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Navigation */}
      <Navbar
        onOpenBuzzer={() => setIsBuzzerOpen(true)}
        onOpenPlayers={() => setIsPlayersOpen(true)}
        onOpenCharacters={() => setIsCharactersOpen(true)}
        players={players}
        currentPlayer={currentPlayer}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-4 flex flex-col justify-center">
        {/* Category Selector */}
        <div className="mb-4">
          <CategoriesFilter
            activeCategory={activeCategory}
            setActiveCategory={(cat) => {
              setActiveCategory(cat);
              setCurrentCardIndex(0);
            }}
          />
        </div>

        {/* Card Display */}
        <CardDeck
          card={currentCard}
          onNextCard={handleNextCard}
          currentPlayer={currentPlayer}
          onAddDrink={handleAddDrink}
        />
      </main>

      {/* Footer / Credits */}
      <footer className="bg-[#120F1D] border-t border-purple-500/20 py-3 px-4 text-center text-xs text-gray-400">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>Inspirado en</span>
          <strong className="text-yellow-400 font-comic text-sm">"Basta de Estupideces Podcast"</strong>
          <span>• Base Mentrix</span>
        </p>
      </footer>

      {/* Modals */}
      <BuzzerModal
        isOpen={isBuzzerOpen}
        onClose={() => setIsBuzzerOpen(false)}
      />

      <CharactersModal
        isOpen={isCharactersOpen}
        onClose={() => setIsCharactersOpen(false)}
      />

      <PlayerSetup
        isOpen={isPlayersOpen}
        onClose={() => setIsPlayersOpen(false)}
        players={players}
        setPlayers={setPlayers}
        currentTurnIndex={currentTurnIndex}
        setCurrentTurnIndex={setCurrentTurnIndex}
      />
    </div>
  );
}
