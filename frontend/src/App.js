import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn'
import Poll from './pages/Poll'
import CreateNewPoll from './pages/CreateNewPoll'

const App = () => (
  <Router>
    <Switch>
      <Route path='/sign-in/:from?'>
        <SignIn />
      </Route>
      <Route path='/create-new-poll'>
        <CreateNewPoll />
      </Route>
      <Route path='/poll/:id'>
        <Poll />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  </Router>
)

export default App
