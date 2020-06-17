import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
          <Switch>
            <ProtectedRoute exact path="/" >
              <Home />
            </ProtectedRoute>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
      </Router>
    
    </div>
  );
}

export default App;
