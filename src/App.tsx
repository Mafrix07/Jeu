import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Vote } from './pages/Vote';
import { Waiting } from './pages/Waiting';
import { ResultsMe } from './pages/ResultsMe';
import { ResultsAll } from './pages/ResultsAll';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/results/me" element={<ResultsMe />} />
        <Route path="/results/all" element={<ResultsAll />} />
      </Routes>
    </Router>
  );
}

export default App;
