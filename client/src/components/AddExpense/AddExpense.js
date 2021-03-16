import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../Loader/Loader'
// import AlertMessage from '../AlertMessage/AlertMessage'
import { listExpenseFilter } from '../../actions/expenseActions'

const AddExpense = ({ setModal }) => {
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('Rupee')
  const [category, setCategory] = useState('Food')
  const [description, setDescription] = useState('')
  const [show, setShow] = useState(true)
  const [val, setVal] = useState({})
  const [spin, setSpin] = useState(false)
  const dispatch = useDispatch()
  const expenseFilter = useSelector((state) => state.expenseFilter)
  const {
    userInfo: { token, _id },
  } = useSelector((state) => state.userLogin)
  const { month, week } = expenseFilter

  const handleClose = () => {
    setShow(false)
    setModal()
  }

  const dateHandler = (e) => {
    const date = new Date(e.target.value)
    const dateMonth = date.getMonth()
    const adjustedDate = date.getDate() + date.getDay()
    const prefixes = ['0', '1', '2', '3', '4', '5']
    const dateWeek = parseInt(prefixes[0 | (adjustedDate / 7)]) + 1
    setVal({
      month: dateMonth + 1,
      week: dateWeek,
      user: _id,
      amount,
      currency,
      category,
      description,
    })
  }

  const saveHandler = async () => {
    setSpin(true)
    try {
      if (!('month' in val) || !('week' in val)) {
        alert('Fill all the places')
        throw new Error('Form unfilled')
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      }
      await axios.post('/api/expenses/', val, config)
      setSpin(false)
      handleClose()
      dispatch(listExpenseFilter(month, week, 1))
    } catch (err) {
      setSpin(false)
      console.log(err.message)
    }
  }

  return (
    <>
      <Modal
        size='lg'
        show={show}
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add Expense
          </Modal.Title>
        </Modal.Header>
        {spin ? (
          <Modal.Body>
            <Loader />
          </Modal.Body>
        ) : (
          <>
            <Modal.Body>
              <div className='mx-md-5 mx-xs-2'>
                <Form>
                  <Form.Group controlId='formAmount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Amount'
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId='selectCurrency'>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control
                      as='select'
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value='Rupee' defaultValue>
                        Rupee
                      </option>
                      <option value='Euro'>Euro</option>
                      <option value='Dollar'>Dollar</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='formDecription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      placeholder='Input Details (optional)'
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId='selectCategory'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as='select'
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value='Food' defaultValue>
                        Food
                      </option>
                      <option value='Home'>Home</option>
                      <option value='Fuel'>Fuel</option>
                      <option value='Shopping'>Shopping</option>
                      <option value='Other'>Other</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className='mr-md-4 mr-xs-1'>Date</Form.Label>
                    <input
                      type='date'
                      defaultValue='dd-mm-yyyy'
                      onChange={(e) => dateHandler(e)}
                    />
                  </Form.Group>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button type='button' variant='success' onClick={saveHandler}>
                Save
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  )
}

export default AddExpense
