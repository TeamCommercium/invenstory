import { connect } from 'react-redux';

import Settings from '../components/settings';
import { simpleValidateEmail } from '../util/util';
import { updateUserInfo, getUserInfo } from '../util/requests';

import {
  USER_SETTINGS_UPDATE_EMAIL,
  USER_SETTINGS_UPDATE_ZIPCODE,
  USER_SETTINGS_UPDATE_NAME,
  USER_SETTINGS_UPDATE_ERR_EMAIL,
  USER_SETTINGS_TOGGLE_MAIL,
  USER_SETTINGS_UPDATE_MAIL
} from '../actionTypes';

const mapState = (store) => ({
  name: store.userSettings.name,
  email: store.userSettings.email,
  zipcode: store.userSettings.zipcode,
  mailNotifications: store.userSettings.mailNotifications,
  err_email: store.userSettings.err_email
});

const mapDispatch = (dispatch) => {
  // Rather than using a componentWillMount, I'll just do the call ahead of time.
  getUserInfo()
    .then(response => {
      dispatch({ type: USER_SETTINGS_UPDATE_NAME, data: response[0].amzn_username });
      dispatch({ type: USER_SETTINGS_UPDATE_EMAIL, data: response[0].amzn_email });
      dispatch({ type: USER_SETTINGS_UPDATE_ZIPCODE, data: Number(response[0].amzn_zip) });

      if (!! response[0].emailnotify) {
        dispatch({ type: USER_SETTINGS_UPDATE_MAIL, data: true });
      }
    });

  return {
    handleInput: (name, value) => {
      dispatch({ type: name, data: value });
    },
    handleSubmit: (name, email, zipcode, mailNotifications) => {
      if (!simpleValidateEmail(email)) {
        dispatch({ type: USER_SETTINGS_UPDATE_ERR_EMAIL, data: 'Must be valid email address' });
      } else {
        dispatch({ type: USER_SETTINGS_UPDATE_ERR_EMAIL, data: '' });

        const userInfo = {};
        userInfo.amzn_username = name;
        userInfo.amzn_email = email;
        userInfo.amzn_zip = zipcode;
        userInfo.emailnotify = mailNotifications;

        updateUserInfo(userInfo);
      }
    },
    handleToggle: () => {
      dispatch({ type: USER_SETTINGS_TOGGLE_MAIL });
    }
  };
};

export default connect(mapState, mapDispatch)(Settings);
