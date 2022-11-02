import React, { useEffect, useRef, useState } from 'react'
import Typewriter from "typewriter-effect"
import NonSSRWrapper from '../utils/nonSSRWrapper'
import axios from 'axios'

import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setAuthState, setUserId, setUser, selectUser } from '../store/authSlice';

import open from '../styles/Open.module.scss'
import login from '../styles/Login.module.scss'
import award from '../styles/Awards.module.scss'
import Head from 'next/head'

import Award from '../utils/awards';

import { toast, ToastContainer } from 'react-toastify'
import { getSuccess, getUser, toastAll } from '../utils/functions'
import {BsCheckCircleFill} from 'react-icons/bs'

import 'react-toastify/dist/ReactToastify.css'
import { useUserQuery } from '../hooks/useUser'
import Account from '../utils/accountSchema';
import connectMongo from '../utils/connectMongo';

import awards from '../utils/constant/awards'
import Confirmation from '../utils/components/confirmation'


axios.defaults.withCredentials = true


var jwt = require('jsonwebtoken')
var Validator = require('validatorjs')

const START_DATE = 1667257200


function Stat({tt_users}) {
    return (
        <>
        <div className={open.stat_users}>
            <span>{tt_users} soldiers</span>
        </div>
        </>
    )
}

const Header = ({scrollToMain, tt_users}, ref) => {

    const [height, setHeight] = useState('100vh')

    useEffect(() => {
        setHeight(window.innerHeight)
    })
    
    return(
        <header className={open.header} style={{
            height: height
        }} >
            <span className={open.tag}>#nonutnovember</span>
            <span className={open.quote}>
                <Typewriter
                    onInit={(typewriter)=> {

                        typewriter
                        .changeDelay(50)
                        .pauseFor(200)
                        .typeString("Become a hero.")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Enter the legend.")
                        .start()
                    }}
                />
            </span>
            
            <Stat tt_users={tt_users}/>

            <div className={open.bottom_arrow} onClick={() => {
                scrollToMain()
            }}>
                <div className={open.arrow}/>
            </div>
        </header>
    )
}

function SignIn() {
    
    let [pwd_1, setPwd_1] = useState('')
    let [name, setName] = useState('')

    const dispatch = useDispatch()

    function signin(){

        var name_0 = name.toLocaleLowerCase().trim()

        var rules = {
            name: 'min:3|max:20|required',
            password: 'min:6|max:50|required'
        }

        var validate = new Validator({
            name: name_0,
            password: pwd_1
        }, rules)

        if(validate.passes()) {
            axios.post('/api/authentication/signin', {
                name: name_0,
                pwd: pwd_1
            }).then((res) => {
                if(res.data.success) {
                    dispatch(setAuthState(true))
                    dispatch(setUser(res.data.user))
                }

                toastAll(res.data.message, getSuccess(res))
            })
        } else {
            toastAll(validate.messages(),'warning')
        }
        
    }

    return(
        <>
            <h3 className={login.title}>Welcome back soldier !</h3>
            <input type='text' placeholder='Username...' minLength={3} maxLength={20} 
                onChange={(e) => setName(e.target.value)}
            />
            <input type='password' placeholder='Password...' minLength={6} maxLength={50}
                onChange={(e) => setPwd_1(e.target.value)}
            />
            <div className={login.bottom} onClick={() => signin()}>
                <span>{"Let's go !"}</span>
            </div>
        </>
    )
}

function SignUp() {
    let [pwd_1, setPwd_1] = useState('')
    let [pwd_2, setPwd_2] = useState('')
    let [name, setName] = useState('')

    let[stop, setStop] = useState(false)

    
    const dispatch = useDispatch()

    function signup(){

        var name_0 = name.toLocaleLowerCase().trim()

        var rules = {
            name: 'min:3|max:20|required',
            password: 'min:6|max:50|required'
        }

        var validate = new Validator({
            name: name_0,
            password: pwd_1
        }, rules)

        if(validate.passes() && pwd_1 == pwd_2) {
            if(!stop){
                setStop(true)
                
                axios.post('/api/authentication/signup', {
                    name: name_0,
                    pwd: pwd_1
                }).then((res) => {

                    setStop(false)
                    if(res.data.success) {
                        dispatch(setAuthState(true))
                        dispatch(setUser(res.data.user))
                    } 
                    
                    toastAll(res.data.message, getSuccess(res))
                })

            }
            
        } else {
            !validate.passes()? toastAll(validate.errors):toastAll('Please confirm your password')
        }
        
    }

    return(
        <>
            <h3 className={login.title}>Join the nnn legion</h3>
            <input type='text' placeholder='Username...' minLength={3} maxLength={20} 
                onChange={(e) => setName(e.target.value)}
            />
            <input type='password' placeholder='Password...' minLength={6} maxLength={50}
                onChange={(e) => setPwd_1(e.target.value)}
            />
            <input type='password' placeholder='Confirm password...'
                onChange={(e) => setPwd_2(e.target.value)}
            />
            <div className={login.bottom} onClick={() => signup()}>
                <span>{"Let's go !"}</span>
            </div>
        </>
    )
}

function Login() {
    let [action, setAction] = useState(true)
    // action = true ==> sign up
    // action = false ==> sign in
    return(
        <div className={login.container}>

            {action?
                <SignUp/>
            :
                <SignIn/>
            }
            <span className={login.switch} onClick={() => setAction(!action)}>{action?'Sign-in':'Sign-up'}</span>
        </div>
    )
}

const MainComponent = (props, ref) => {

    const authState = useSelector(selectAuthState)
    const user= useSelector(selectUser)

    const {} = useUserQuery()

    return(
        
        <section ref={ref} className={login.section}>          
            {authState?
                <>
                {Date.now()/1000 > START_DATE?
                    <Confirmation user={user}/>
                :
                <div className={login.container}>
                    <div className={login.message_container}>

                        <BsCheckCircleFill/>
                        <p>{"You are already connected ! Don't forget to come back on November 1st  ;)"}</p>
                    </div>
                </div>}

                </>
            :
                <>
                {authState === false?
                    <Login/>
                :
                    null
                }
                </>
            }
        </section>
    )
}

const Main = React.forwardRef(MainComponent)


function Footer() {
    const [message, setMessage] = useState(Math.random() > 0.99? '🍑': '❤️')
    return(
        <footer>
            <span>Made with {message} by @Poukilanomata</span>
        </footer>
    )
}


export async function getStaticProps() {
    await connectMongo()
    let tt_users = await Account.countDocuments({})
    return{
        props: {
            tt_users
        },
        
        revalidate: 60
    }
}

export default function Home(props) {
    let mainRef = useRef(null)

    const [time, setTime] = useState(START_DATE - Math.floor(Date.now()/1000))

    const scrollToMain = () => {
        mainRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})
    }

    useEffect(() => {
        const interval = setInterval(() => {
          setTime(time - 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [time]);

    function convertToDate(time) {
        let days = Math.floor(time/86400)
        time = time - days * 86400

        let hours = Math.floor(time/3600)
        time = time - hours*3600

        let minutes = Math.floor(time/60)
        time = time - minutes*60

        let seconds = time 

        return days+'d '+hours+'h '+minutes+'m '+seconds+'s'
    }

    return (
        <>
            <Head>
                <title>NNN Legion</title>
                <meta name='description' content='No Nut November - Enter the legion !'/>
            </Head>

            <Header scrollToMain={scrollToMain} tt_users={props.tt_users}/>
            <Main data={props} ref={mainRef}/>

            {Date.now()/1000 > START_DATE?
                <section className={award.section}>
                {Object.keys(awards).map((key, index) => {
                    return(
                        <Award
                            key={index+key}
                            title={key}
                            img_url={awards[key]['image']}
                            content={awards[key]['description']}
                            day={awards[key]['day']}
                        />
                    )
                })}
                </section>
            :
                <NonSSRWrapper>
                    <div className={open.timer_container}>
                        <span className={open.timer}>{convertToDate(time)}</span>
                    </div>
                </NonSSRWrapper>
                
            }
            <NonSSRWrapper>
                <Footer/>
            </NonSSRWrapper>

            <ToastContainer />
        </>
    )
}