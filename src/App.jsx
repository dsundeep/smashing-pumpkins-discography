import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <main className="app-layout">
      <nav className="app-nav">
        <h1>Smashing Pumpkins</h1>
      </nav>

      <AppRoutes />
    </main>
  );
}

export default App;
