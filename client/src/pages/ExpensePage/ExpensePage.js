import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Expense from '../../components/Expense'
import { listExpenseFilter } from '../../actions/expenseActions'
import Loader from '../../components/Loader/Loader'
import AlertMessage from '../../components/AlertMessage/AlertMessage'
import AddExpense from '../../components/AddExpense/AddExpense'

const ExpensePage = ({ history }) => {
  const [monthVal, setMonthVal] = useState(0)
  const [weekVal, setWeekVal] = useState(0)
  // const [pageNumber, setPageNumber] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  const expenseFilter = useSelector((state) => state.expenseFilter)
  const {
    loading,
    error,
    expenses,
    month,
    week,
    pageNumber,
    totalPages,
  } = expenseFilter
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const changeModalState = () => setShowModal(false)

  const nextPageHandler = () => {
    if (pageNumber < totalPages) {
      dispatch(listExpenseFilter(month, week, pageNumber + 1))
    }
  }

  const previousPageHandler = () => {
    if (pageNumber > 1) {
      dispatch(listExpenseFilter(month, week, pageNumber - 1))
    }
  }

  const filterHandler = () => {
    if (monthVal !== Number(0)) {
      dispatch(listExpenseFilter(monthVal, weekVal, 1))
    }
  }

  useEffect(() => {
    if (userInfo) {
      dispatch(listExpenseFilter(monthVal, weekVal, 1))
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo])

  return (
    <>
      {showModal ? <AddExpense setModal={changeModalState} /> : null}
      <Row>
        <Col xs={12} md={9}>
          <h1>List of Expenses</h1>
        </Col>
        <Col xs={12} md={3} as='div' className='d-flex justify-content-end'>
          <Button tyoe='button' onClick={() => setShowModal(true)}>
            <i className='fas fa-plus'></i>
            <span> </span> ADD
          </Button>
        </Col>
      </Row>
      <hr />
      <h5 className='mt-5'>Filter by:</h5>
      <Form inline>
        <Form.Label className='my-1 mr-2' htmlFor='selectMonth'>
          Month
        </Form.Label>
        <Form.Control
          as='select'
          className='my-1 mr-4'
          id='selectMonth'
          custom
          onChange={(e) => setMonthVal(e.target.value)}
        >
          <option value='0' defaultValue>
            Choose
          </option>
          <option value='1'>Jan</option>
          <option value='2'>Feb</option>
          <option value='3'>Mar</option>
          <option value='4'>Apr</option>
          <option value='5'>May</option>
          <option value='6'>Jun</option>
          <option value='7'>Jul</option>
          <option value='8'>Aug</option>
          <option value='9'>Sept</option>
          <option value='10'>Oct</option>
          <option value='11'>Nov</option>
          <option value='12'>Dec</option>
        </Form.Control>
        <Form.Label className='my-1 mr-2' htmlFor='selectWeek'>
          Week
        </Form.Label>
        <Form.Control
          as='select'
          className='my-1 mr-4'
          id='selectWeek'
          custom
          onChange={(e) => setWeekVal(e.target.value)}
        >
          <option value='0' defaultValue>
            Choose
          </option>
          <option value='1'>Week 1</option>
          <option value='2'>Week 2</option>
          <option value='3'>Week 3</option>
          <option value='4'>Week 4</option>
          <option value='5'>Week 5</option>
        </Form.Control>
        <Button type='button' className='my-1' onClick={filterHandler}>
          Filter
        </Button>
      </Form>
      <hr className='mb-5' />
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>{error}</AlertMessage>
      ) : (
        <>
          <Row>
            {expenses.map((expense) => {
              return (
                <Col key={expense._id} sm={12} md={6} lg={4} xl={4}>
                  <Expense expense={expense} />
                </Col>
              )
            })}
          </Row>
          <div className='d-flex flex-row justify-content-around pt-2 pb-5'>
            {pageNumber > 1 ? (
              <Button type='button' onClick={previousPageHandler}>
                <i class='fas fa-arrow-circle-left'></i> Prev Page
              </Button>
            ) : null}
            {pageNumber < totalPages ? (
              <Button type='button' onClick={nextPageHandler}>
                Next Page <i className='fas fa-arrow-circle-right'></i>
              </Button>
            ) : null}
          </div>
        </>
      )}
    </>
  )
}

export default ExpensePage
