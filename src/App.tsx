import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SessionProvider } from './state/session';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Detect } from './pages/Detect';
import { Timeline } from './pages/Timeline';
import { Respond } from './pages/Respond';
import { Plan } from './pages/Plan';
import { Shield } from './pages/Shield';
import { Academy } from './pages/Academy';
import { Support } from './pages/Support';
import { Rights } from './pages/Rights';
import { Privacy } from './pages/Privacy';
import { About } from './pages/About';

export const App: React.FC = () => {
  return (
    <SessionProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-brand-cream text-brand-slate">
          {/* Top navigation header */}
          <Navbar />

          {/* Page Routing */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detect" element={<Detect />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/respond" element={<Respond />} />
              <Route path="/plan" element={<Plan />} />
              <Route path="/shield" element={<Shield />} />
              <Route path="/academy" element={<Academy />} />
              <Route path="/support" element={<Support />} />
              <Route path="/rights" element={<Rights />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/about" element={<About />} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </SessionProvider>
  );
};

export default App;
