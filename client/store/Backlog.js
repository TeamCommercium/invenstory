import action from './propActions';

/**
 * Additional utilities for the store object for safe rendering.
 * @class Backlog
 * @param subscribeTo - Function bound to the store for intelligent event subscription.
 * @param smartDispatch - Function bound to the store for intelligent event emitting.
 */
export default class Backlog {

  constructor(props) {
    this.containers = {};
    this.subscribeTo = props.subscribeTo;
    this.smartDispatch = props.smartDispatch;

    // This is necessary because I need methods in the enumerable keys
    // Same as this.unMounting = Backlog.prototype.unMounting
    this.unMounting = this.unMounting;
    this.register = this.register;
    this.syncWithStore = this.syncWithStore;
  }


  /**
   * Called after the action's payload is sent to the components state (if mounted)
   *
   * @callback postHandle
   * @param {Object} newState - A fresh copy of the newly updated store
   */

  /**
   * Register a container with store properties. Should only be used in that containers constructor.
   * @function register
   * @param {string} container - The name of the container being registered
   * @param {Object[]} listenTo - List of store property names (strings) that the container is listening to.
   * @param {Object} context - The value of this passed in from container.
   * @param {postHandle} callback - For actions that need to happen immediately after setting new state.
   * @this Backlog
   * @return context of the container that invoked function
   */
  register(container, listenTo, context, callback) {
    if (Array.isArray(listenTo) === false) {
      throw new Error('Register expected an array in the second parameter');
    }

    this.containers[container] = {
      association: listenTo,
      mounted: context.mounted
    };

    listenTo.forEach((key) =>
      this.subscribeTo(key, (newState) => {
        if (context.mounted) {
          context.setState({ [key]: newState[key] });
          if (typeof callback === 'function') {
            callback(newState);
          }
        } else {
          action[key].pending = true;
          action[key].payload = newState[key];
        }
      })
    );
    return context;
  }

  /**
   * Should only be used in componentWillUnmount
   * @function unMounting
   * @param {string} container - The name of the container being registered
   * @param {object} context - The value of this passed in from container.
   * @throws Recieved a container that isn't registered. Don't forget to add it to subscribeTo.jsx
   * @this Backlog
   * @return context of the container that invoked function
   */
  unMounting(container, context) {
    if (! this.containers[container]) {
      throw new Error(`Recieved a container that isn't registered. Don't forget to add it to subscribeTo.jsx`);
    }

    this.containers[container].mounted = false;
    context.mounted = false;

    return context;
  }

  /**
   * Should only be used in componentDidMount
   * @function syncWithStore
   * @param {string} container - The name of the container being registered
   * @param {Object[]} listenTo - List of store property names (strings) that the container is listening to.
   * @param {object} context - The value of this passed in from container.
   * @throws Recieved a container that isn't registered. Don't forget to add it to subscribeTo.jsx
   * @this Backlog
   * @return context of the container that invoked function
   */
  syncWithStore(container, listenTo, context) {
    if (! this.containers[container]) {
      throw new Error(`Recieved a container that isn't registered. Don't forget to add it to subscribeTo.jsx`);
    }

    if (Array.isArray(listenTo) === false) {
      throw new Error(`sync expected an array in the listenTo property of the first parameter ${container}`, listenTo);
    }

    this.containers[container].mounted = true;
    context.mounted = true;

    // Find all relevant properties that have pending data and grab payload.
    this.containers[container].association
      .filter(cur => action[cur].pending)
      .forEach(cur => {
        context.setState({[cur]: action[cur].payload});
        action[cur].pending = false;
      });

    return context;
  }
}
