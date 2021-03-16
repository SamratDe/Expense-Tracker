import React, { useState, useEffect } from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import AlertMessage from '../../components/AlertMessage/AlertMessage'
import { register } from '../../actions/userActions'

const Register = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [fullName, setFullName] = useState('')

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      history.push('/dashboard')
    }
  }, [history, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(register(fullName, email, password))
  }
  return (
    <div className='login-container'>
      <h1>Register</h1>
      {error && (
        <AlertMessage variant='danger'>{'Failed to Register'}</AlertMessage>
      )}
      {loading ? <Loader /> : null}
      <div className='form-div'>
        <Form onSubmit={submitHandler}>
          <Form.Row>
            <Form.Group as={Col} controlId='firstName'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  setFullName(e.target.value + ' ' + lastName)
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='lastName'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                  setFullName(firstName + ' ' + e.target.value)
                }}
              />
            </Form.Group>
          </Form.Row>
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
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
      <p className='mt-5'>
        Already has an account ? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  )
}

export default Register
