import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Bot from './routes/Bot';
import NotFound from './routes/NotFound';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);

  return (
    <main className="h-screen">
    
        <Router>
          <Routes>
          <Route exact path="/" element={<Home/>} />
              <Route path="/bot/:instance/:room" element={<Bot/>} />
            <Route element={<NotFound/>} />

          </Routes>
        </Router>
    
    </main>
  );
};

export default App;
