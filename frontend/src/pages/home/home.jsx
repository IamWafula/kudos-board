
import styles from "./home.module.css"

import { useState, useEffect, useContext, createContext } from "react";

// components
import Search from "../../components/searchComponent/search"
import Board from "../../components/boardComponent/Board";
import { Navigate, useLocation } from "react-router-dom";
import AuthModal from "../../components/authModal/AuthModal";



// could get this to outside helper function
async function getAllBoards(){
  const DATABASE_URL = import.meta.env.VITE_DATABASE_URL

  const url = `${DATABASE_URL}/board`

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


function Home (props) {

  // stores search term and filter option
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("")
  const user = props.user ? props.user : {name: "Guest", id: null}
  const setUser = props.setUser
  const [showLogin, setShowLogin]  = useState(false)

  // stores board visuals for bottom
  const [allBoards, setAllBoards] = useState([])


  // navigator states
  const [goHome, setGoHome] = useState(false)


  useEffect(() =>{
    getAllBoards()
      .then(data => {
        setAllBoards(data)
      })
  }, [])

return (
    <div id={styles.homeContent}>

        <h1 id={styles.kudos}>COODOS
        Board</h1>

        <div id={styles.header}>
          <p>{user.name}</p>
          {
            (user.name == "Guest") && (
              <p onClick={()=> {setShowLogin(true)}} id={ (user.id ? styles.signout : styles.login) }> Login </p>
            )
          }

          {
            (user.name != "Guest") && (
              <p onClick={()=> {setUser({name: "Guest", id: null})}} id={ (user.id ? styles.signout : styles.login) }  >
                Signout
              </p>
            )
          }
        </div>
        {
          filter && (
            <Navigate to="/boards" replace={true} state={ { filterTerm: filter, searchTerm : searchTerm } }  />
          )
        }

        {
          searchTerm && (
            <Navigate to="/boards" replace={true} state={ { filterTerm: filter, searchTerm : searchTerm } }  />
          )
        }

        {
          showLogin && (
            <AuthModal setShowLogin={setShowLogin} setUser={setUser}/>
          )
        }

        <Search  setSearchTerm={setSearchTerm} setFilter={setFilter} />
        <div id={styles.content}>
          {
            allBoards.map( (board) => {
              return( <Board key={board.id} img={board.mediaUrl} user={user}/> )
            })
          }
        </div>
        <div id={styles.footer}> Kudos-Board Project : Ian Wafula @ 2024 </div>
    </div>
  )
}


export default Home;
