import React, { useState, useMemo } from 'react';
import { CARDS } from './data/cards';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { CardDeck } from './components/CardDeck';
import { CategoriesFilter } from './components/CategoriesFilter';
import { BuzzerModal } from './components/BuzzerModal';
import { CharactersModal } from './components/CharactersModal';
import { PlayerSetup } from './components/PlayerSetup';
import { RulesModal } from './components/RulesModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'game'
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isBuzzerOpen, setIsBuzzerOpen] = useState(false);
  const [isCharactersOpen, setIsCharactersOpen] = useState(false);
  const [isPlayersOpen, setIsPlayersOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

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
    setCurrentCardIndex(prev => (prev + 1) % filteredCards.length);
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
      {/* Top Navigation Bar */}
      <Navbar
        onOpenBuzzer={() => setIsBuzzerOpen(true)}
        onOpenPlayers={() => setIsPlayersOpen(true)}
        onOpenCharacters={() => setIsCharactersOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        onGoHome={() => setCurrentScreen('home')}
        currentScreen={currentScreen}
        players={players}
        currentPlayer={currentPlayer}
      />

      {/* Main Screen Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-4 flex flex-col justify-center">
        {currentScreen === 'home' ? (
          /* ================= PANTALLA DE INICIO ================= */
          <HomeScreen
            onStartGame={() => setCurrentScreen('game')}
            onOpenPlayers={() => setIsPlayersOpen(true)}
            onOpenCharacters={() => setIsCharactersOpen(true)}
            onOpenRules={() => setIsRulesOpen(true)}
            onOpenBuzzer={() => setIsBuzzerOpen(true)}
            players={players}
          />
        ) : (
          /* ================= PANTALLA DE JUEGO ================= */
          <div className="w-full flex flex-col justify-center animate-fade-in">
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

            {/* Central Card Deck */}
            <CardDeck
              card={currentCard}
              onNextCard={handleNextCard}
              currentPlayer={currentPlayer}
              onAddDrink={handleAddDrink}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#120F1D] border-t border-purple-500/20 py-2.5 px-4 text-center text-xs text-gray-400">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>Inspirado en</span>
          <strong className="text-yellow-400 font-comic text-sm">"Basta de Estupideces Podcast"</strong>
          <span>• Mentrix Studios (Servidor Local)</span>
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

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
