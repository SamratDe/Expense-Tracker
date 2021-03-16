import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand style={{ fontSize: '1.6rem', fontWeight: '600' }}>
              ExpTrack
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo ? (
                <>
                  <LinkContainer to='/dashboard'>
                    <Nav.Link>DASHBOARD</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/expenselist'>
                    <Nav.Link>EXPENSES</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/report'>
                    <Nav.Link>REPORT</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item onClick={logoutHandler}>
                      LOG OUT
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>SIGN IN</Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <>
                  <NavDropdown title={'ADMIN'} id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
