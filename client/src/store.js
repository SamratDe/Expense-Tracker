import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  expenseFilterReducer,
  expenseListReducer,
  expenseReportReducer,
} from './reducers/expenseReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDeleteReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  expenseList: expenseListReducer,
  expenseFilter: expenseFilterReducer,
  expenseReport: expenseReportReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
