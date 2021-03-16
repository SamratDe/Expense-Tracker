import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Dropdown, DropdownButton } from 'react-bootstrap'
import Expense from '../../components/Expense'
import { listExpenses } from '../../actions/expenseActions'
import Loader from '../../components/Loader/Loader'
import AlertMessage from '../../components/AlertMessage/AlertMessage'

const Dashboard = ({ history }) => {
  const [val, setVal] = useState('dollar')
  const [iconLink, setIconLink] = useState('fas fa-dollar-sign')
  const dispatch = useDispatch()
  const expenseList = useSelector((state) => state.expenseList)
  const { loading, error, expenses, money } = expenseList
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(listExpenses())
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo])

  const change1Handler = () => {
    setVal('dollar')
    setIconLink('fas fa-dollar-sign')
  }

  const change2Handler = () => {
    setVal('euro')
    setIconLink('fas fa-euro-sign')
  }

  const change3Handler = () => {
    setVal('rupee')
    setIconLink('fas fa-rupee-sign')
  }
  return (
    <>
      <h1>Dashboard</h1>
      <hr />
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>
          {'Sorry, something went wrong'}
        </AlertMessage>
      ) : (
        <>
          <Row>
            <Col sm={12} md={8}>
              <h2>
                Total Expenses : <i className={iconLink}></i>
                {money[val]}
              </h2>
            </Col>
            <Col sm={12} md={4}>
              <DropdownButton variant='secondary' title={'Choose Currency'}>
                <Dropdown.Item onClick={change1Handler}>Dollar</Dropdown.Item>
                <Dropdown.Item onClick={change2Handler}>Euro</Dropdown.Item>
                <Dropdown.Item onClick={change3Handler}>Rupee</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <div className='mt-5'>
            <h3 className='mb-4'>Last 5 saved expenses: </h3>
            <Row>
              {expenses.map((expense) => {
                return (
                  <Col key={expense._id} sm={12} md={6} lg={4} xl={4}>
                    <Expense expense={expense} />
                  </Col>
                )
              })}
            </Row>
          </div>
        </>
      )}
    </>
  )
}

export default Dashboard
