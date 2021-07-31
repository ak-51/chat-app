import './App.css'
import { io } from 'socket.io-client'
import { Fragment, useEffect, useState } from 'react'

var socket
const CONNECTION_PORT = "/"

function App() {
  const [logged, setLogged] = useState(false)
  const [room, setRoom] = useState('')
  const [username, setUsername] = useState('')

  useEffect(() => {
    socket = io(CONNECTION_PORT)
  }, [CONNECTION_PORT])

  const connectToRoom = (e) => {
    e.preventDefault()
    setLogged(true)
    socket.emit('join_room', room)
  }

  return(
    <Fragment>
      <div className="App">
        {!logged ?
        (
          <form className="login" onSubmit={connectToRoom}>
            <div className="inputs">
              <input type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)} required />
              <input type="text" placeholder="Room" onChange={(e) => setRoom(e.target.value)} required />
            </div>
            <div className="buttons">
              <button className>Enter Chat</button>
            </div>
          </form>
        )
        :
        (
          <div className="chatContainer">
            <div className="messages">
              
            </div>
            <div className="messageInputs">
              <input type="text" placeholder="Message" />
              <button>Send</button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default App