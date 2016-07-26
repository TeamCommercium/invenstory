/**
 * @description Associates action names with store property names stores the
 * recent payload and pending status.
 * Used when a dispatched action is associated with an unmounted component
 */

export default {
  detail: {
    UPDATE_DETAIL_DATA: true,
    pending: false,
    payload: undefined
  },
  authenticated: {
    UPDATE_AUTHENTICATION: true,
    pending: false,
    payload: undefined
  },
  tableData: {
    UPDATE_TABLE_DATA: true,
    pending: false,
    payload: undefined
  },
  graphData: {
    UPDATE_GRAPH_DATA: true,
    pending: false,
    payload: undefined
  },
  tab: {
    CHANGE_TAB: true,
    pending: false,
    payload: undefined
  },
  notifications: {
    UPDATE_NOTIFICATIONS: true,
    pending: false,
    payload: undefined
  },
  pieChartData: {
    UPDATE_PIECHART_DATA: true,
    pending: false,
    payload: undefined
  }
};
