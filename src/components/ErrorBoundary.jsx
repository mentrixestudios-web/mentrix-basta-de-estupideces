import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(k => caches.delete(k)));
      }
    } catch (e) {
      console.warn('Error clearing caches on reload:', e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#120F1D] text-white flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#211933] border-4 border-yellow-400 rounded-3xl p-6 sm:p-8 text-center shadow-pop-lg">
            <div className="w-16 h-16 bg-red-600 rounded-full border-2 border-black flex items-center justify-center mx-auto mb-4 shadow-pop animate-bounce">
              <AlertTriangle className="w-8 h-8 text-yellow-300" />
            </div>

            <div className="inline-block bg-red-600 text-yellow-300 font-comic text-xl px-4 py-1 rounded-xl border-2 border-black shadow-pop mb-3">
              ¡ATENCIÓN AMIGAS!
            </div>

            <h2 className="font-comic text-2xl sm:text-3xl text-yellow-300 mb-2">
              EL CARRETE SE ACTUALIZÓ
            </h2>

            <p className="text-gray-300 text-sm font-medium mb-6 leading-relaxed">
              Hay una nueva versión disponible o un archivo se estaba actualizando. Presiona el botón de abajo para recargar la fiesta sin problemas.
            </p>

            <button
              onClick={this.handleReload}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-comic text-xl py-3 px-6 rounded-2xl border-2 border-black shadow-pop flex items-center justify-center gap-2 transition active:scale-95"
            >
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>RECARGAR EL JUEGO</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
