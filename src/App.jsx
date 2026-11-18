import React, { useState, useMemo, useEffect } from 'react';
import { CARDS } from './data/cards';
import { GAME_MODES } from './data/modes';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { CardDeck } from './components/CardDeck';
import { CategoriesFilter } from './components/CategoriesFilter';
import { BuzzerModal } from './components/BuzzerModal';
import { CharactersModal } from './components/CharactersModal';
import { PlayerSetup } from './components/PlayerSetup';
import { RulesModal } from './components/RulesModal';
import { AnonymousModal } from './components/AnonymousModal';
import { VerdictModal } from './components/VerdictModal';
import { ShareStoryModal } from './components/ShareStoryModal';
import { SoundboardModal } from './components/SoundboardModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // 'home' | 'game'
  const [selectedMode, setSelectedMode] = useState('previa'); // 'te' | 'previa' | 'sinfiltro'
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Modals state
  const [isBuzzerOpen, setIsBuzzerOpen] = useState(false);
  const [isCharactersOpen, setIsCharactersOpen] = useState(false);
  const [isPlayersOpen, setIsPlayersOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isAnonymousOpen, setIsAnonymousOpen] = useState(false);
  const [isVerdictOpen, setIsVerdictOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isSoundboardOpen, setIsSoundboardOpen] = useState(false);
  const [storyCardTarget, setStoryCardTarget] = useState(null);
  const [storyVerdictTarget, setStoryVerdictTarget] = useState(null);

  // Game Statistics (Fase 4 - El Veredicto del Carrete)
  const [gameStats, setGameStats] = useState({
    cardsPlayed: 0,
    buzzerCount: 0,
    anonymousCount: 0,
    bastaVerdicts: { basta: 0, perdonable: 0 }
  });

  const handleOpenCardStory = (cardToShare) => {
    setStoryCardTarget(cardToShare);
    setStoryVerdictTarget(null);
    setIsStoryModalOpen(true);
  };

  const handleOpenVerdictStory = (verdictPayload) => {
    setStoryCardTarget(null);
    setStoryVerdictTarget(verdictPayload);
    setIsStoryModalOpen(true);
  };

  // Custom Anonymous Cards (persisted in localStorage)
  const [customCards, setCustomCards] = useState(() => {
    try {
      const saved = localStorage.getItem('basta_custom_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('basta_custom_cards', JSON.stringify(customCards));
    } catch (e) {
      console.warn('Error saving custom cards to localStorage', e);
    }
  }, [customCards]);

  const handleAddCustomCard = (newCard) => {
    setCustomCards(prev => [newCard, ...prev]);
  };

  const handleDeleteCustomCard = (id) => {
    setCustomCards(prev => prev.filter(c => c.id !== id));
  };

  // Initial Players with Karla, Paulina & Natalia
  const [players, setPlayers] = useState([
    { id: '1', name: 'Karla', avatar: '/images/carla.jpg', drinksCount: 0 },
    { id: '2', name: 'Paulina', avatar: '/images/paulina.jpg', drinksCount: 0 },
    { id: '3', name: 'Natalia', avatar: '/images/natalia.jpg', drinksCount: 0 }
  ]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);

  // All Cards combined (Built-in + Custom Anonymous)
  const allCardsCombined = useMemo(() => {
    return [...customCards, ...CARDS];
  }, [customCards]);

  // Filtered Cards by Intensity Mode AND Category
  const filteredCards = useMemo(() => {
    // 1. Filter by intensity mode
    const modeCards = allCardsCombined.filter(c => c.intensity && c.intensity.includes(selectedMode));
    const baseList = modeCards.length > 0 ? modeCards : allCardsCombined;

    // 2. Filter by category
    if (activeCategory === 'all') return baseList;
    const catFiltered = baseList.filter(c => c.category === activeCategory);
    return catFiltered.length > 0 ? catFiltered : baseList;
  }, [allCardsCombined, selectedMode, activeCategory]);

  const currentCard = filteredCards[currentCardIndex % filteredCards.length];
  const currentPlayer = players[currentTurnIndex % players.length];
  const currentModeObj = GAME_MODES.find(m => m.id === selectedMode) || GAME_MODES[1];

  const handleNextCard = () => {
    setGameStats(prev => ({
      ...prev,
      cardsPlayed: prev.cardsPlayed + 1,
      anonymousCount: currentCard?.isAnonymous ? prev.anonymousCount + 1 : prev.anonymousCount
    }));
    setCurrentCardIndex(prev => (prev + 1) % filteredCards.length);
    setCurrentTurnIndex(prev => (prev + 1) % players.length);
  };

  const handleOpenBuzzer = () => {
    setIsBuzzerOpen(true);
    setGameStats(prev => ({ ...prev, buzzerCount: prev.buzzerCount + 1 }));
  };

  const handleRecordWhoWinner = (playerId) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, whoVotesCount: (p.whoVotesCount || 0) + 1 };
      }
      return p;
    }));
  };

  const handleRecordBastaVerdict = (type) => {
    setGameStats(prev => ({
      ...prev,
      bastaVerdicts: {
        ...prev.bastaVerdicts,
        [type]: (prev.bastaVerdicts?.[type] || 0) + 1
      }
    }));
  };

  const handleRestartGame = () => {
    setPlayers(prev => prev.map(p => ({ ...p, drinksCount: 0, whoVotesCount: 0 })));
    setGameStats({
      cardsPlayed: 0,
      buzzerCount: 0,
      anonymousCount: 0,
      bastaVerdicts: { basta: 0, perdonable: 0 }
    });
    setCurrentCardIndex(0);
    setCurrentTurnIndex(0);
  };

  const handleAddDrink = () => {
    setPlayers(prev => prev.map((p, idx) => {
      if (idx === currentTurnIndex % prev.length) {
        return { ...p, drinksCount: (p.drinksCount || 0) + 1 };
      }
      return p;
    }));
  };

  const handleAddDrinkToPlayer = (playerId) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === playerId) {
        return { ...p, drinksCount: (p.drinksCount || 0) + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Navigation Bar */}
      <Navbar
        onOpenBuzzer={handleOpenBuzzer}
        onOpenPlayers={() => setIsPlayersOpen(true)}
        onOpenCharacters={() => setIsCharactersOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenAnonymous={() => setIsAnonymousOpen(true)}
        onOpenVerdict={() => setIsVerdictOpen(true)}
        onOpenSoundboard={() => setIsSoundboardOpen(true)}
        onGoHome={() => setCurrentScreen('home')}
        currentScreen={currentScreen}
        players={players}
        currentPlayer={currentPlayer}
        selectedMode={selectedMode}
        customCardsCount={customCards.length}
        cardsPlayedCount={gameStats.cardsPlayed}
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
            onOpenBuzzer={handleOpenBuzzer}
            onOpenAnonymous={() => setIsAnonymousOpen(true)}
            onOpenVerdict={() => setIsVerdictOpen(true)}
            onOpenSoundboard={() => setIsSoundboardOpen(true)}
            cardsPlayedCount={gameStats.cardsPlayed}
            players={players}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            customCardsCount={customCards.length}
          />
        ) : (
          /* ================= PANTALLA DE JUEGO ================= */
          <div className="w-full flex flex-col justify-center animate-fade-in">
            {/* Mode Banner Indicator in Game */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-xl font-comic text-xs tracking-wider border border-black shadow-sm"
                  style={{ backgroundColor: currentModeObj.badgeColor, color: selectedMode === 'te' || selectedMode === 'previa' ? '#000' : '#FFF' }}
                >
                  {currentModeObj.emoji} {currentModeObj.name.toUpperCase()}
                </span>
                <span className="text-[11px] text-gray-400 hidden sm:inline">
                  {filteredCards.length} cartas disponibles
                </span>
                {customCards.length > 0 && (
                  <span className="text-[10px] bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-500/40 px-2 py-0.5 rounded-lg font-bold">
                    🤫 {customCards.length} anónimas
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAnonymousOpen(true)}
                  className="text-xs text-fuchsia-300 hover:text-fuchsia-200 font-bold flex items-center gap-1 bg-[#2C183C] px-2.5 py-1 rounded-lg border border-fuchsia-500/30"
                  title="Agregar secreto anónimo"
                >
                  <span>+ Secreto</span>
                </button>
                <button
                  onClick={() => setCurrentScreen('home')}
                  className="text-xs text-yellow-300 hover:underline font-semibold"
                >
                  Cambiar modo
                </button>
              </div>
            </div>

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
              onAddDrinkToPlayer={handleAddDrinkToPlayer}
              players={players}
              selectedMode={selectedMode}
              onRecordWhoWinner={handleRecordWhoWinner}
              onRecordBastaVerdict={handleRecordBastaVerdict}
              onOpenVerdict={() => setIsVerdictOpen(true)}
              cardsPlayedCount={gameStats.cardsPlayed}
              onOpenStoryModal={handleOpenCardStory}
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

      {/* Fase 3 Modal: Buzón Anónimo */}
      <AnonymousModal
        isOpen={isAnonymousOpen}
        onClose={() => setIsAnonymousOpen(false)}
        onAddCustomCard={handleAddCustomCard}
        customCards={customCards}
        onDeleteCustomCard={handleDeleteCustomCard}
      />

      {/* Fase 4 Modal: Diagnóstico / Veredicto Final */}
      <VerdictModal
        isOpen={isVerdictOpen}
        onClose={() => setIsVerdictOpen(false)}
        players={players}
        gameStats={gameStats}
        onRestartGame={handleRestartGame}
        onGoHome={() => setCurrentScreen('home')}
        selectedMode={selectedMode}
        onOpenStoryModal={handleOpenVerdictStory}
      />

      {/* Fase 5 Modal: Modo Viral (Exportar para Instagram Stories) */}
      <ShareStoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        card={storyCardTarget}
        verdictData={storyVerdictTarget}
        currentPlayer={currentPlayer}
        selectedMode={selectedMode}
      />

      {/* Fase 6 Modal: Soundboard de Voces de las Conductoras */}
      <SoundboardModal
        isOpen={isSoundboardOpen}
        onClose={() => setIsSoundboardOpen(false)}
      />
    </div>
  );
}
