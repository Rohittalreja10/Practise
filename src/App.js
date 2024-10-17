import './App.css';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Forgot from './components/Forgot/Forgot';
import Reset from './components/Reset/Reset';
import Home from './components/Home/Home';
import Upload from "./components/Home/Upload/Upload";
import Fetch from './components/Home/Fetch/Fetch';
import EventDetails from './components/Home/EventDetails/EventDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/home" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/fetch" element={<Fetch />} />
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
