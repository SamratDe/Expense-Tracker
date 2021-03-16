import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../Loader/Loader'
// import AlertMessage from '../AlertMessage/AlertMessage'
import { listExpenseFilter } from '../../actions/expenseActions'

const EditExpense = ({
  setModal,
  expense: { _id, amount, currency, description, category },
}) => {
  const [show, setShow] = useState(true)
  const [val, setVal] = useState({})
  const [spin, setSpin] = useState(false)
  const dispatch = useDispatch()
  const expenseFilter = useSelector((state) => state.expenseFilter)
  const {
    userInfo: { token },
  } = useSelector((state) => state.userLogin)
  const { month, week, pageNumber } = expenseFilter

  const handleClose = () => {
    setShow(false)
    setModal()
  }

  const inputHandler = (e, name) => {
    setVal({ ...val, [name]: e.target.value })
  }

  const saveHandler = async () => {
    setSpin(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      }
      await axios.put(`/api/expenses/${_id}`, val, config)
      setSpin(false)
      handleClose()
      dispatch(listExpenseFilter(month, week, pageNumber))
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
            Expense Details
          </Modal.Title>
        </Modal.Header>
        {spin ? (
          <Modal.Body>
            <Loader />
          </Modal.Body>
        ) : (
          <>
            <Modal.Body>
              <div className='ml-md-5'>
                <Form>
                  <Form.Group controlId='formAmount'>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Amount'
                      defaultValue={amount}
                      onChange={(e) => inputHandler(e, 'amount')}
                    />
                  </Form.Group>
                  <Form.Group controlId='selectCurrency'>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control
                      as='select'
                      onChange={(e) => inputHandler(e, 'currency')}
                    >
                      <option value={currency} defaultValue hidden>
                        {currency}
                      </option>
                      <option value='Rupee'>Rupee</option>
                      <option value='Euro'>Euro</option>
                      <option value='Dollar'>Dollar</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='formDecription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as='textarea'
                      placeholder='Input Details (optional)'
                      defaultValue={description}
                      onChange={(e) => inputHandler(e, 'description')}
                    />
                  </Form.Group>
                  <Form.Group controlId='selectCategory'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as='select'
                      onChange={(e) => inputHandler(e, 'category')}
                    >
                      <option value={category} defaultValue hidden>
                        {category}
                      </option>
                      <option value='Food'>Food</option>
                      <option value='Home'>Home</option>
                      <option value='Fuel'>Fuel</option>
                      <option value='Shopping'>Shopping</option>
                      <option value='Other'>Other</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Cancel
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

export default EditExpense
