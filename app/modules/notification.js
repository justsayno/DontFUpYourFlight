import { createReducer } from './utility'
import { createScheduledNotification, getNextNotification, notifications } from '../lib/notifications'

// ------------------------------------
// Constants
// ------------------------------------

const CREATE_NOTIFICATION_REQUESTED = 'CREATE_NOTIFICATION_REQUESTED'
const CREATE_NOTIFICATION_SUCCESS_RECEIVED = 'NOTIFICATION_SUCCESS_RECEIVED'
const CREATE_NOTIFICATION_ERROR_RECEIVED = 'CREATE_NOTIFICATION_ERROR_RECEIVED'
const RESET_NOTIFICATION_STATE = 'RESET_NOTIFICATION_STATE'

export const ActionTypes = {
  CREATE_NOTIFICATION_REQUESTED,
  CREATE_NOTIFICATION_SUCCESS_RECEIVED,
  CREATE_NOTIFICATION_ERROR_RECEIVED,
  RESET_NOTIFICATION_STATE
}

// ------------------------------------
// Actions
// ------------------------------------
const createNotificationRequested = () => {
  return {
    type: ActionTypes.CREATE_NOTIFICATION_REQUESTED
  }
}

const createNotificationSuccessReceived = (notificationIndex) => {
  return {
    type: ActionTypes.CREATE_NOTIFICATION_SUCCESS_RECEIVED,
    notificationIndex
  }
}

const createNotificationErrorReceived = (error) => {
  return {
    type: ActionTypes.CREATE_NOTIFICATION_ERROR_RECEIVED,
    error
  }
}

export const resetNotificationState = () => {
  return {
    type: ActionTypes.RESET_NOTIFICATION_STATE
  }
}

// ------------------------------------
// Action Creators
// ------------------------------------

const createNotification = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const lastNotificationIndex = getLastNotificationIndex(state)
    const nextNotification = getNextNotification(lastNotificationIndex)
    dispatch(createNotificationRequested())
    createScheduledNotification(nextNotification.message)
    dispatch(createNotificationSuccessReceived(notifications.indexOf(nextNotification)))
  } catch (error) {
    dispatch(createNotificationErrorReceived(error))
  }
}

export const Actions = {
  createNotification,
  resetNotificationState
}

// ------------------------------------
// Selectors
// ------------------------------------

const getError = state => state.addFlight.error
const getIsCreating = state => state.addFlight.isCreating
const getHasCreated = state => state.addFlight.hasCreated
const getLastNotificationIndex = state => state.notification.lastNoficationIndex

export const Selectors = {
  getError,
  getHasCreated,
  getIsCreating,
  getLastNotificationIndex
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const handleCreateNotificationRequested = (state, action) => {
  return {
    ...state,
    isCreating: true
  }
}

const handleCreateNotificationSuccessReceived = (state, action) => {
  return {
    ...state,
    isCreating: false,
    lastNoficationIndex: action.notificationIndex
  }
}

const handleCreateNotificationErrorReceived = (state, action) => {
  return {
    ...state,
    isCreating: false,
    error: action.error
  }
}

const handleCreateNotificationState = (state, action) => {
  return {
    ...state,
    ...INITIAL_STATE
  }
}

export const ActionHandlers = {
  [ActionTypes.CREATE_NOTIFICATION_REQUESTED]: handleCreateNotificationRequested,
  [ActionTypes.CREATE_NOTIFICATION_SUCCESS_RECEIVED]: handleCreateNotificationSuccessReceived,
  [ActionTypes.CREATE_NOTIFICATION_ERROR_RECEIVED]: handleCreateNotificationErrorReceived,
  [ActionTypes.RESET_NOTIFICATION_STATE]: handleCreateNotificationState
}

// ------------------------------------
// Reducer
// ------------------------------------
const INITIAL_STATE = {
  error: '',
  isCreating: false,
  lastNoficationIndex: null
}

export default createReducer(INITIAL_STATE, ActionHandlers)
