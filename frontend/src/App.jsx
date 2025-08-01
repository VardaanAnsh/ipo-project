// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import IpoDetail from './pages/IpoDetail';
import EditIPO from './pages/EditIPO';
import IpoSubscription from './pages/IpoSubscription';
import IpoAllotment from './pages/IpoAllotment';
import Settings from './pages/Settings';
import ApiManager from './pages/ApiManager';
import Accounts from './pages/Accounts';
import Help from './pages/Help';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ipo/:id" element={<IpoDetail />} />
        <Route path="/edit/:id" element={<EditIPO />} />    
        <Route path="/subscription" element={<IpoSubscription />} />
        <Route path="/allotment" element={<IpoAllotment />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/api-manager" element={<ApiManager />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/help" element={<Help />} />
        
      </Routes>
    </Router>
  );
}

export default App;
