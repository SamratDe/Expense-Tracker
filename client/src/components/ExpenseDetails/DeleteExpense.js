import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../Loader/Loader'
// import AlertMessage from '../AlertMessage/AlertMessage'
import { listExpenseFilter } from '../../actions/expenseActions'

const DeleteExpense = ({ setModal, expense: { _id } }) => {
  const [show, setShow] = useState(true)
  const [spin, setSpin] = useState(false)
  const dispatch = useDispatch()
  const expenseFilter = useSelector((state) => state.expenseFilter)
  const {
    userInfo: { token },
  } = useSelector((state) => state.userLogin)
  const { month, week } = expenseFilter

  const handleClose = () => {
    setShow(false)
    setModal()
  }

  const deleteHandler = async () => {
    setSpin(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      }
      await axios.delete(`/api/expenses/${_id}`, config)
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
            Deleting Expense
          </Modal.Title>
        </Modal.Header>
        {spin ? (
          <Modal.Body>
            <Loader />
          </Modal.Body>
        ) : (
          <>
            <Modal.Body>
              <h5>Are you sure ?</h5>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Cancel
              </Button>
              <Button type='button' variant='success' onClick={deleteHandler}>
                Yes
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  )
}

export default DeleteExpense
