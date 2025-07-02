import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/sign-in';
import Dashboard from './pages/dashboard';
import Reports from './pages/reports';
import Attendance from './pages/attendance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="*" element={<div style={{padding:40, textAlign:'center'}}><h1>404 - Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
