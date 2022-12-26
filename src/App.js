import './App.css';
import Navigation from './components/Navigation';
import { Router, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Navigation />
      <Route path='/' exact />
      </Router>
      </>
  );
}

export default App;
