import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import AlertMessage from '../../components/AlertMessage/AlertMessage'
import { login } from '../../actions/userActions'

const Login = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='login-container'>
      <h1>Sign In</h1>
      {error && (
        <AlertMessage variant='danger'>{'Invalid Credentails'}</AlertMessage>
      )}
      {loading ? <Loader /> : null}
      <div className='form-div'>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className='center-button'>
            <Button variant='primary' type='submit'>
              Log In
            </Button>
          </div>
        </Form>
      </div>
      <p className='mt-5'>
        New to Expense Tracker ? <Link to='/register'>Register</Link>
      </p>
    </div>
  )
}

export default Login
