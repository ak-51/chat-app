import { io } from 'socket.io-client'
import { Fragment, useEffect, useState, useRef } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'

function App2 () {
    return(
        <Fragment>
            <BrowserRouter>
                <Switch>
                    <Route path='/register' exact>
                        <Register />
                    </Route>
                    <Route path='/login' exact>
                        <Login />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Fragment>
    )
}

export default App2