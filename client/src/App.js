import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import Homepage from './pages/Homepage/Homepage'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ExpensePage from './pages/ExpensePage/ExpensePage'
import Report from './pages/Report/Report'
import UserListScreen from './pages/UserListScreen/UserListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='pt-4'>
        <Container>
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/expenselist' component={ExpensePage} />
          <Route path='/report' component={Report} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/' component={Homepage} exact />
        </Container>
      </main>
    </Router>
  )
}

export default App
