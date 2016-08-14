import initialState from '../store/initialState';
import {
  USER_SETTINGS_UPDATE_EMAIL,
  USER_SETTINGS_TOGGLE_MAIL,
  USER_SETTINGS_UPDATE_ZIPCODE,
  USER_SETTINGS_UPDATE_NAME,
  USER_SETTINGS_UPDATE_ERR_EMAIL,
  USER_SETTINGS_UPDATE_MAIL
} from '../actionTypes';

/**
 * Reducer for user settings
 * @function userSettingsReducer
 * @param {Object} state
 * @param {string} action
 * @return new value for this store property or default state
 */

export default function(state = initialState.userSettings, action) {
  const oldState = Object.assign({}, state);

  switch (action.type) {
    case USER_SETTINGS_TOGGLE_MAIL:
      oldState.mailNotifications = !oldState.mailNotifications;
      return oldState;
 
    case USER_SETTINGS_UPDATE_MAIL:
      oldState.mailNotifications = !oldState.mailNotifications;
      return oldState;

    case USER_SETTINGS_UPDATE_EMAIL:
      oldState.email = action.data;
      return oldState;

    case USER_SETTINGS_UPDATE_ZIPCODE:
      oldState.zipcode = Number(action.data);
      return oldState;

    case USER_SETTINGS_UPDATE_NAME:
      oldState.name = action.data;
      return oldState;

    case USER_SETTINGS_UPDATE_ERR_EMAIL:
      oldState.err_email = action.data;
      return oldState;

    default:
      return state;
  }
}
