/**
 * @description Initial value of the store
 */

export default {
  tableData: [],
  graphData: [],
  pieChartData: [],
  authenticated: false,
  lastChanged: null,
  detail: {},
  notifications: [],
  tab: 0,
  userSettings: {
    name: '',
    zipcode: '',
    email: '',
    err_email: '',
    mailNotifications: false
  }
};
