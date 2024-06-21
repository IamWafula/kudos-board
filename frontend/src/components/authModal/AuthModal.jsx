import styles from "./AuthModal.module.css"

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from "@fortawesome/free-solid-svg-icons"


// firebase imports
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"


// react Hooks
import { useState, useEffect } from "react";

// could get this to outside helper function
async function addUser(email){
    const url = `http://127.0.0.1:3000/users/`


    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": email.toLowerCase()
      })
    }

    const allBoards = await fetch(url, options)
    const resJson = await allBoards.json()

    return resJson
}

async function getUserId(email){
    const url = `http://127.0.0.1:3000/users/username/${email}`


    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }

    const allBoards = await fetch(url, options)
    const resJson = await allBoards.json()

    return resJson
}

export default function AuthModal (props) {

    const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY
    const [message, setMessage] = useState("Enter Account Details")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClose = () => {
        props.setShowLogin(false)
    }


    const firebaseConfig = {
        apiKey: API_KEY,
        authDomain: "kudos-board-1931e.firebaseapp.com",
        projectId: "kudos-board-1931e",
        storageBucket: "kudos-board-1931e.appspot.com",
        messagingSenderId: "163525536302",
        appId: "1:163525536302:web:159493fe3edfec7d7c4dbf"
    };

    const app = initializeApp(firebaseConfig);

    // sign in
    const handleSignup = () => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                if (user){

                    addUser(user.email)
                        .then(data => {
                            props.setUser(data)
                            props.setShowLogin(false)
                        })
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMessage("Invalid Credentials")
            });
    }

    // login up
    const handleLogin = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user){

                    getUserId(user.email)
                        .then(data => {
                            console.log(data)

                            props.setUser(data)
                            props.setShowLogin(false)
                        })

                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setMessage("Invalid Credentials")
            });
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange =(e) => {
        setPassword(e.target.value)
    }

    return (
        <div id={styles.auth_modal} >
            <div id={styles.modal_content} >
                <div id={styles.close_btn}>
                    <FontAwesomeIcon icon={faX}
                        onClick={handleClose}
                    />
                </div>

                <p id={styles.error}> {message}</p>

                <input id={styles.username} onChange={handleEmailChange} placeholder="email" />

                <input id={styles.pwd} onChange={handlePasswordChange} placeholder="password" type="password" />

                <button id={styles.login} onClick={handleLogin} >login</button>

                <button id={styles.signup} onClick={handleSignup}>signup</button>

            </div>
        </div>
    )
}
