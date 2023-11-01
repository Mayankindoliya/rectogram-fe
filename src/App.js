
import './App.css';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostOverview from './pages/PostOverview';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App app-bg">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/posts" element={<PostOverview />}></Route>
          <Route exact path="/myprofile" element={<Profile />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
