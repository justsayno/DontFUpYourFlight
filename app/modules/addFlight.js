import { createReducer } from './utility'

import * as firebase from 'firebase'

const createFlight = async (flight) => {
  var flightsRef = firebase.database().ref('flights')
  await flightsRef.push(flight)
}

// ------------------------------------
// Constants
// ------------------------------------

const CREATE_FLIGHT_REQUESTED = 'CREATE_FLIGHT_REQUESTED'
const CREATE_FLIGHT_SUCCESS_RECEIVED = 'CREATE_FLIGHT_SUCCESS_RECEIVED'
const CREATE_FLIGHT_ERROR_RECEIVED = 'CREATE_FLIGHT_ERROR_RECEIVED'
const RESET_ADD_FLIGHTS_STATE = 'RESET_ADD_FLIGHTS_STATE'

export const ActionTypes = {
  CREATE_FLIGHT_REQUESTED,
  CREATE_FLIGHT_SUCCESS_RECEIVED,
  CREATE_FLIGHT_ERROR_RECEIVED,
  RESET_ADD_FLIGHTS_STATE
}

// ------------------------------------
// Actions
// ------------------------------------
const createFlightRequested = (flight) => {
  return {
    type: ActionTypes.CREATE_FLIGHT_REQUESTED,
    flight
  }
}

const createFlightSuccessReceived = (flight) => {
  return {
    type: ActionTypes.CREATE_FLIGHT_SUCCESS_RECEIVED,
    flight
  }
}

const createFlightErrorReceived = (error) => {
  return {
    type: ActionTypes.CREATE_FLIGHT_ERROR_RECEIVED,
    error
  }
}

export const resetAddFlightsState = () => {
  return {
    type: ActionTypes.RESET_ADD_FLIGHTS_STATE
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------

const createUserFlight = (flight) => async (dispatch, getState) => {
  try {
    const state = getState()
    if (getHasCreated(state) && !getIsCreating(state)) return
    dispatch(createFlightRequested(flight))
    await createFlight(flight)
    dispatch(createFlightSuccessReceived(flight))
  } catch (error) {
    console.error(error)
    dispatch(createFlightErrorReceived(error))
  }
}

export const Actions = {
  createUserFlight,
  resetAddFlightsState
}

// ------------------------------------
// Selectors
// ------------------------------------

const getError = state => state.addFlight.error
const getIsCreating = state => state.addFlight.isCreating
const getHasCreated = state => state.addFlight.hasCreated

export const Selectors = {
  getError,
  getHasCreated,
  getIsCreating
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const handleCreateFlightRequested = (state, action) => {
  return {
    ...state,
    isCreating: true,
    hasCreated: false
  }
}

const handleCreateFlightSuccessReceived = (state, action) => {
  return {
    ...state,
    isCreating: false,
    hasCreated: true
  }
}

const handleCreateFlightErrorReceived = (state, action) => {
  return {
    ...state,
    isCreating: false,
    hasCreated: true,
    error: action.error
  }
}

const handleRestAddFlightState = (state, action) => {
  return {
    ...state,
    ...INITIAL_STATE
  }
}

export const ActionHandlers = {
  [ActionTypes.CREATE_FLIGHT_REQUESTED]: handleCreateFlightRequested,
  [ActionTypes.CREATE_FLIGHT_SUCCESS_RECEIVED]: handleCreateFlightSuccessReceived,
  [ActionTypes.CREATE_FLIGHT_ERROR_RECEIVED]: handleCreateFlightErrorReceived,
  [ActionTypes.RESET_ADD_FLIGHTS_STATE]: handleRestAddFlightState
}

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  isCreating: false,
  hasCreated: false,
  flight: null
}

export default createReducer(INITIAL_STATE, ActionHandlers)