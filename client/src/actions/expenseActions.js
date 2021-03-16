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
import axios from 'axios'

export const listExpenses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    }
    const { data } = await axios.get('/api/expenses/', config)
    let dollar = Number(0)
    let euro = Number(0)
    let rupee = Number(0)
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].currency === 'Dollar')
        dollar += parseInt(data.data[i].amount)
      if (data.data[i].currency === 'Euro')
        euro += parseInt(data.data[i].amount)
      if (data.data[i].currency === 'Rupee')
        rupee += parseInt(data.data[i].amount)
    }
    const payload = {
      expenses: data.data.slice(0, 5),
      money: { dollar, euro, rupee },
    }
    dispatch({ type: EXPENSE_LIST_SUCCESS, payload })
  } catch (err) {
    dispatch({
      type: EXPENSE_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const listExpenseFilter = (month, week, pageNumber) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: EXPENSE_FILTER_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    }
    const { data } = await axios.get('/api/expenses', config)

    let res = data.data
    month = parseInt(month)
    week = parseInt(week)
    pageNumber = parseInt(pageNumber)
    if (month > 0 && week > 0) {
      res = data.data.filter((e) => e.month === month && e.week === week)
    } else if (month > 0) {
      res = data.data.filter((e) => e.month === month)
    }

    const totalPages = Math.ceil(res.length / 5)

    res = res.slice((pageNumber - 1) * 5, pageNumber * 5)

    const finalRes = {
      expenses: res,
      month,
      week,
      pageNumber,
      totalPages,
    }
    dispatch({ type: EXPENSE_FILTER_SUCCESS, payload: finalRes })
  } catch (err) {
    dispatch({
      type: EXPENSE_FILTER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const reportExpenses = (month) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPENSE_REPORT_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const token = userInfo.token
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    }
    const { data } = await axios.get('/api/expenses', config)
    month = parseInt(month)
    let res = data.data.filter((e) => e.month === month)
    let finalRes = []
    let dollar = Number(0)
    let euro = Number(0)
    let rupee = Number(0)
    for (let i = 0; i < res.length; i++) {
      if (res[i].week === Number(1)) {
        if (res[i].currency === 'Dollar') dollar = dollar + res[i].amount
        if (res[i].currency === 'Euro') euro = euro + res[i].amount
        if (res[i].currency === 'Rupee') rupee = rupee + res[i].amount
      }
    }
    finalRes.push([dollar, euro, rupee])

    dollar = Number(0)
    euro = Number(0)
    rupee = Number(0)
    for (let i = 0; i < res.length; i++) {
      if (res[i].week === Number(2)) {
        if (res[i].currency === 'Dollar') dollar = dollar + res[i].amount
        if (res[i].currency === 'Euro') euro = euro + res[i].amount
        if (res[i].currency === 'Rupee') rupee = rupee + res[i].amount
      }
    }
    finalRes.push([dollar, euro, rupee])

    dollar = Number(0)
    euro = Number(0)
    rupee = Number(0)
    for (let i = 0; i < res.length; i++) {
      if (res[i].week === Number(3)) {
        if (res[i].currency === 'Dollar') dollar = dollar + res[i].amount
        if (res[i].currency === 'Euro') euro = euro + res[i].amount
        if (res[i].currency === 'Rupee') rupee = rupee + res[i].amount
      }
    }
    finalRes.push([dollar, euro, rupee])

    dollar = Number(0)
    euro = Number(0)
    rupee = Number(0)
    for (let i = 0; i < res.length; i++) {
      if (res[i].week === Number(4)) {
        if (res[i].currency === 'Dollar') dollar = dollar + res[i].amount
        if (res[i].currency === 'Euro') euro = euro + res[i].amount
        if (res[i].currency === 'Rupee') rupee = rupee + res[i].amount
      }
    }
    finalRes.push([dollar, euro, rupee])

    dollar = Number(0)
    euro = Number(0)
    rupee = Number(0)
    for (let i = 0; i < res.length; i++) {
      if (res[i].week === Number(5)) {
        if (res[i].currency === 'Dollar') dollar = dollar + res[i].amount
        if (res[i].currency === 'Euro') euro = euro + res[i].amount
        if (res[i].currency === 'Rupee') rupee = rupee + res[i].amount
      }
    }
    finalRes.push([dollar, euro, rupee])

    dispatch({ type: EXPENSE_REPORT_SUCCESS, payload: finalRes })
  } catch (err) {
    dispatch({
      type: EXPENSE_REPORT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}
