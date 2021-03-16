import {
  EXPENSE_LIST_REQUEST,
  EXPENSE_LIST_SUCCESS,
  EXPENSE_LIST_FAIL,
  EXPENSE_FILTER_REQUEST,
  EXPENSE_FILTER_SUCCESS,
  EXPENSE_FILTER_FAIL,
  EXPENSE_REPORT_REQUEST,
  EXPENSE_REPORT_SUCCESS,
  EXPENSE_REPORT_FAIL,
} from '../constants/expenseConstants'

export const expenseListReducer = (
  state = { expenses: [], money: { dollar: 0, euro: 0, rupee: 0 } },
  action
) => {
  switch (action.type) {
    case EXPENSE_LIST_REQUEST:
      return { ...state, loading: true, expenses: [] }
    case EXPENSE_LIST_SUCCESS:
      return {
        loading: false,
        expenses: action.payload.expenses,
        money: action.payload.money,
      }
    case EXPENSE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const expenseFilterReducer = (
  state = { expenses: [], month: 0, week: 0, pages: 1 },
  action
) => {
  switch (action.type) {
    case EXPENSE_FILTER_REQUEST:
      return { ...state, loading: true, expenses: [] }
    case EXPENSE_FILTER_SUCCESS:
      const { expenses, month, week, pageNumber, totalPages } = action.payload
      return { loading: false, expenses, month, week, pageNumber, totalPages }
    case EXPENSE_FILTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const expenseReportReducer = (state = { monthlyCost: [] }, action) => {
  switch (action.type) {
    case EXPENSE_REPORT_REQUEST:
      return { ...state, loading: true, monthlyCost: [] }
    case EXPENSE_REPORT_SUCCESS:
      return { loading: false, monthlyCost: action.payload }
    case EXPENSE_REPORT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
