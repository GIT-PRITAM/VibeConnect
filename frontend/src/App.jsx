
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from './pages/landing'
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext.jsx';
import VideoMeetComponent from './pages/VideoMeet.jsx';
import HomeComponenet from './pages/home.jsx';
import History from './pages/history.jsx';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "VibeConnect"; // Set your custom tab title here
  }, []);

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path='/auth' element={<Authentication />} />
            <Route path='/home' element={<HomeComponenet />} />
            <Route path='/history' element={<History />} />
            <Route path='/home/:url' element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App


