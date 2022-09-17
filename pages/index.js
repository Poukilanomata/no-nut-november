import React, { useEffect, useRef, useState } from 'react'
import Typewriter from "typewriter-effect"
import NonSSRWrapper from '../utils/nonSSRWrapper'
import axios from 'axios'

import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setAuthState, setUserId, setUser } from '../store/authSlice';

import open from '../styles/Open.module.scss'
import login from '../styles/Login.module.scss'
import award from '../styles/Awards.module.scss'
import Head from 'next/head'

//images
import Soldier from '../public/images/soldier.png'
import Adjudant from '../public/images/adjutant.png'
import Lieutenant from '../public/images/lieutenant.png'
import Colonel from '../public/images/colonel.png'
import King from '../public/images/king.png'
import Emperor from '../public/images/emperor.png'
import Sensei from '../public/images/sensei.png'
import Master from '../public/images/master.png'
import Jedi from '../public/images/jedi.png'

import Award from '../utils/awards';

import { toast, ToastContainer } from 'react-toastify'
import { getSuccess, getUser, toastAll } from '../utils/functions'
import {BsCheckCircleFill} from 'react-icons/bs'

import 'react-toastify/dist/ReactToastify.css'
import { useUserQuery } from '../hooks/useUser'
import Account from '../utils/accountSchema';
import connectMongo from '../utils/connectMongo';

axios.defaults.withCredentials = true


var jwt = require('jsonwebtoken')
var Validator = require('validatorjs')


const awards = {
    'Soldier': {
        image: Soldier,
        day: 0,
        description: "Welcome Soldier ! Your objective is simple: to resist. \nA long journey awaits you where you will have to resist for at least a month or more for the most valorous. \nAny failure during this month will not be accepted or you will be considered as a outcast from society! \nMay the force be with you."
    },

    'Adjudant': {
        image: Adjudant,
        day: 3,
        description: "You've been promoted to adjutant! \nI shouldn't really congratulate you on passing this grade. Don't forget that you have many days left so don't rest on your laurels! \nKeep up the good work!"
    },

    'Lieutenant': {
        image: Lieutenant,
        day: 6,
        description: "You've been promoted to lieutenant! \nOne week has now passed. You are one of the 45% of men who have not touched themself for a week. Not bad for a newbie but not enough to make it to 'Suprem leader'. \nSo what are you doing? Why aren't you doing anything? Come on, train and hurry up!"
    },

    'Colonel': {
        image: Colonel,
        day: 9,
        description: "You've been promoted to colonel! \nYou've been holding out for nine days now. \nThat's a higher rank than the lieutenant rank you got after 6 days .... By the way, 9 days, 6 days... 9 6 .... 69 ....... ( ͡° ͜ʖ ͡°). Anyway, keep it up!"
    },

    'King': {
        image: King,
        day: 12,
        description: "You've been promoted to King! \nIt's been 10 days that you're holding your position. \nAll the kingdom is proud of you. Watch your progression, it's amazing, you may take a little break ... NOOOO !! It was a test. Don't give up, the hardest part is yet to come ..."
    },

    'Emperor': {
        image: Emperor,
        day: 15,
        description: "You've been promoted to Emperor! \nTwo long weeks has now passed. \nIt's about to be serious, you've done half the part ! Tentation is strong but emperors are stronger, keep this in mind."
    },

    'Sensei': {
        image: Sensei,
        day: 18,
        description: "You've been promoted to Sensei! \nDon't you feel that something is different... Yes... An aura of wisdom surrounds you Sensei. It's BIG BRAIN TIME !"
    },

    'Master': {
        image: Master,
        day: 21,
        description: "You've been promoted to Master! \nBravo ... really bravo ... 21 days, you deserve your master rank. After resisting for so long you should have developed some skills that will help you with the women .... No ? That means you're getting sloppy! Come on, 3 laps of the field and faster than that!"
    },

    'Jedi': {
        image: Jedi,
        day: 24,
        description: "You've been promoted to Jedi ! \nHaving become a Jedi, you now wield your sword like no other and you must stand up to the Empire as it will strike back. But do not weaken, you only have a few days left to achieve your goal!"
    },
}

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
            axios.post('/api/authentication/signup', {
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

    const {} = useUserQuery()

    return(
        <section ref={ref} className={login.section}>          
            {authState?
                <div className={login.container}>
                    <div className={login.message_container}>
                        <BsCheckCircleFill/>
                        <p>{"You are already connected ! Don't forget to come back on November 1st  ;)"}</p>
                    </div>
                </div>
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

    const [time, setTime] = useState(1667257200 - Math.floor(Date.now()/1000))

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

            {Date.now()/1000 > 1667257200?
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