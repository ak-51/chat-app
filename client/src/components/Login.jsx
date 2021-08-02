import "./Login.css"
import { Fragment, useState } from "react"
import { useHistory } from "react-router-dom"


const Login = () => {
    let history = useHistory()
    const [usrname, setUsrname] = useState('')
    const [password, setPassword] = useState('')

    const loginSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <Fragment>
            <div className="loginContainer">
                <form className="loginForm" onSubmit={loginSubmit}>
                    <div>
                        <input type="text" placeholder="Username" value={usrname} onChange={(e) => setUsrname(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button>Submit</button>
                        <a href="/register">Register an account if you haven't already</a>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default Login