import React from 'react'
import ReactDOM from 'react-dom'
import { AppBar } from 'react-toolbox/lib/index.js'

class App extends React.Component{
  render(){
    return (
      <div> 
        Hello World
        <AppBar fixed flat>
          <a href="/home">React Toolbox Docs</a>
        </AppBar>
       </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))