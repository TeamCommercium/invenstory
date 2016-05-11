import action from './propActions'

/*
  constraints: localState must match store prop name
*/
export default class Backlog{

  constructor(props){
    this.containers = {}
    this.subscribeTo = props.subscribeTo
    this.smartDispatch = props.smartDispatch

    //This is necessary because I am using object.assign to extend 
    //the store object with the keys of this class
    this.unMounting = this.unMounting
    this.register = this.register
    this.syncWithStore = this.syncWithStore
  }

  unMounting(container, context){

    if( ! this.containers[container])
      throw new Error("Recieved a container that isn't registered. Don't forget to add it to subscribeTo.jsx")

    this.containers[container].mounted = false
    context.mounted = false

    return context
  }

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

  syncWithStore(container, listenTo, context){
  // Should only be called when the component is mounted.

    if( ! this.containers[container])
      throw new Error("Recieved a container that isn't registered. Don't forget to add it to subscribeTo.jsx")

    if(Array.isArray(listenTo) === false)
      throw new Error("sync expected an array in the listenTo property of the first parameter" + container, listenTo)

    this.containers[container].mounted = true
    context.mounted = true


    var pending = this.containers[container].association
    var filtered = pending.filter(cur=>action[cur].pending)

    console.log("pending", pending, "filtered", filtered)

    return context
  }
}
