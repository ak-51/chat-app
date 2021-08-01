import './App.css'
import { io } from 'socket.io-client'
import { Fragment, useEffect, useState, useRef } from 'react'

var socket
const CONNECTION_PORT = "/"

function App() {
  const fieldRef = useRef()

  //Before Login
  const [logged, setLogged] = useState(false)
  const [room, setRoom] = useState('')
  const [username, setUsername] = useState('')

  //After Login
  const [message, setMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  useEffect(() => {
    socket = io(CONNECTION_PORT)
  }, [])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data])
      fieldRef.current.scrollIntoView()
    })
  })

  const connectToRoom = (e) => {
    e.preventDefault()
    setLogged(true)
    socket.emit('join_room', room)
  }

  const sendMSG = async(e) => {
    e.preventDefault()
    let messageContent = {
      room: room,
      content: {
        author: username,
        message: message
      }
    }
    await socket.emit("send_message", messageContent)
    await setMessageList([...messageList, messageContent.content])
    fieldRef.current.scrollIntoView()
    setMessage("")
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
          <Fragment>
            <div className="room-title">{room}</div>
            <form onSubmit={sendMSG}>
            <div className="chatContainer">
              <div className="messages">
                {messageList.map((val, key) => {
                  return (
                    <div className="messageContainer" id={val.author === username ? "you" : "notyou" }>
                      <div className="messageIndv">
                        {val.author}: {val.message}
                      </div>
                    </div>
                  )
                })}
                <div ref={fieldRef}></div>
              </div>
              <div className="messageInputs">
                <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button>Send</button>
              </div>
            </div>
            </form>
          </Fragment>
        )}
      </div>
      
    </Fragment>
  )
}

export default App