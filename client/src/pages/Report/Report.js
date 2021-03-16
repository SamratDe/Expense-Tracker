import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { reportExpenses } from '../../actions/expenseActions'
import Loader from '../../components/Loader/Loader'
import AlertMessage from '../../components/AlertMessage/AlertMessage'

const Report = ({ history }) => {
  const [val, setVal] = useState(0)
  const dispatch = useDispatch()
  const expenseReport = useSelector((state) => state.expenseReport)
  const { loading, error, monthlyCost } = expenseReport
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      dispatch(reportExpenses(0))
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo])

  const findHandler = () => {
    dispatch(reportExpenses(val))
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Report</h1>
        </Col>
      </Row>
      <hr className='mb-5' />

      <Row>
        <Col sm={4}>
          <h2>Choose Month: </h2>
        </Col>
        <Col sm={4}>
          <Form>
            <Form.Control
              as='select'
              custom
              onChange={(e) => setVal(e.target.value)}
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
          </Form>
        </Col>
        <Col sm={4}>
          <Button type='button' onClick={findHandler}>
            Find
          </Button>
        </Col>
      </Row>
      <hr className='mb-5' />
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant='danger'>
          {'Something went wrong. Please Refresh the page'}
        </AlertMessage>
      ) : (
        <Row>
          {monthlyCost.map((ele, index) => {
            return (
              <Col key={index} sm={12} md={6} lg={4} xl={4}>
                <Card className='my-3 rounded' key={index}>
                  <Card.Header>
                    <strong>Week {index + 1}</strong>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Dollar: <i className='fas fa-dollar-sign'></i>
                      {ele[0]}
                    </Card.Text>
                    <Card.Text>
                      Euro: <i className='fas fa-euro-sign'></i>
                      {ele[1]}
                    </Card.Text>
                    <Card.Text>
                      Rupee: <i className='fas fa-rupee-sign'></i>
                      {ele[2]}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </>
  )
}

export default Report
