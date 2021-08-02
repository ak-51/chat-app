import { Fragment, useState } from "react"

const Register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [pswdcnf, setPswdcnf] = useState('')

    const regSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <Fragment>
            <form onSubmit={regSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={pswdcnf} onChange={(e) => setPswdcnf(e.target.value)} required />
                <button>Submit</button>
            </form>
            <a href="/login">Login if you have already registered</a>
        </Fragment>
    )
}

export default Register