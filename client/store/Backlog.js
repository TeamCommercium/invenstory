import action from './propActions'


//TODO: Should I just have 1 place that handles "mounted"?
/*
  constraints: localState must match store prop name
*/
export default class Backlog{

  constructor(props){
    this.containers = {}
    this.subscribeTo = props.subscribeTo
    this.smartDispatch = props.smartDispatch

    // This is necessary because I need methods in the enumerable keys
    // Same as this.unMounting = Backlog.prototype.unMounting
    this.unMounting = this.unMounting
    this.register = this.register
    this.syncWithStore = this.syncWithStore
  }


  /*
    Should only be used in componentWillUnmount
   */
  unMounting(container, context){

    if( ! this.containers[container])
      throw new Error("Recieved a container that isn't registered. Don't forget to add it to subscribeTo.jsx")

    this.containers[container].mounted = false
    context.mounted = false

    return context
  }
  /*
    Should only be used in constructors
   */
  register(container, listenTo, context, callback){
    if(this.containers[container])
      console.log("it already existed but we told it to deal with it")
      // throw new Error("Can't register it already exists.")

    if(Array.isArray(listenTo) === false)
      throw new Error("register expected an array in the listenTo property of the first parameter")

    this.containers[container] = { association: listenTo, mounted: context.mounted }

    listenTo.forEach((key)=>
      this.subscribeTo(key, function(newState){

        if(context.mounted){
          context.setState({ [key]: newState[key] })
          if(typeof callback === "function") callback(newState)
        }
        else{
          action[key].pending = true
          action[key].payload = newState[key]
        }
      })
    )
    return context
  }

  /*
    Should only be called in componentDidMount()
   */
  syncWithStore(container, listenTo, context){

    if( ! this.containers[container])
      throw new Error("Recieved a container that isn't registered. Don't forget to add it to subscribeTo.jsx")

    if(Array.isArray(listenTo) === false)
      throw new Error("sync expected an array in the listenTo property of the first parameter" + container, listenTo)

    this.containers[container].mounted = true
    context.mounted = true


    //find all relevant properties that have pending data and grab payload.
    var pending = this.containers[container].association
      .filter(cur=>action[cur].pending)
      .forEach(function(cur){
        context.setState({[cur]: action[cur].payload})
        action[cur].pending = false
      })

    return context
  }
}
