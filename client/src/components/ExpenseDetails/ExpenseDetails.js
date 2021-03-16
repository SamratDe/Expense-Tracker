import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const ExpenseDetails = ({
  setModal,
  expense: { _id, amount, currency, description, category, date },
}) => {
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(false)
    setModal()
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
        <Modal.Body>
          <div className='ml-md-5'>
            <h5>
              EXPENSE ID: <span className='expense-details'>{_id}</span>
            </h5>
            <h5>
              AMOUNT: <span className='expense-details'>{amount}</span>
            </h5>
            <h5>
              CURRENCY: <span className='expense-details'>{currency}</span>
            </h5>
            <h5>DESCRIPTION: </h5>
            {description ? <p>{description}</p> : null}
            <h5>
              CATEGORY: <span className='expense-details'>{category}</span>
            </h5>
            <h5>
              DATE: <span className='expense-details'>{date}</span>
            </h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ExpenseDetails
