import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditExpense from './ExpenseDetails/EditExpense'
import ExpenseDetails from './ExpenseDetails/ExpenseDetails'
import DeleteExpense from './ExpenseDetails/DeleteExpense'

const Expense = ({ expense }) => {
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [url, setUrl] = useState('')

  const changeModalState = () => setShowModal(false)
  const changeEditModalState = () => setEditModal(false)
  const changeDeleteModalState = () => setDeleteModal(false)

  useEffect(() => {
    const val = window.location.href.split('/')
    setUrl(val[val.length - 1])
  }, [])

  return (
    <>
      {showModal ? (
        <ExpenseDetails expense={expense} setModal={changeModalState} />
      ) : null}
      {editModal ? (
        <EditExpense expense={expense} setModal={changeEditModalState} />
      ) : null}
      {deleteModal ? (
        <DeleteExpense expense={expense} setModal={changeDeleteModalState} />
      ) : null}
      <Card className='my-3 rounded'>
        <Card.Header>{expense.category}</Card.Header>
        <Card.Body>
          <Card.Title as='h3'>
            <strong>{expense.amount}</strong>
          </Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            {'Click view to see more info'}
          </Card.Subtitle>
          <div className='mt-4'>
            <Button
              variant='outline-primary'
              onClick={() => setShowModal(true)}
            >
              <i className='fas fa-info-circle'></i> view
            </Button>

            {url === 'expenselist' ? (
              <>
                <Button
                  className='mx-4'
                  variant='outline-success'
                  onClick={() => setEditModal(true)}
                >
                  <i className='fas fa-edit'></i>
                  <span> </span>edit
                </Button>
                <Button
                  variant='outline-danger'
                  onClick={() => setDeleteModal(true)}
                >
                  <i className='fas fa-trash-alt'></i>
                </Button>
              </>
            ) : null}
          </div>
        </Card.Body>
      </Card>
    </>
  )
}

export default Expense
