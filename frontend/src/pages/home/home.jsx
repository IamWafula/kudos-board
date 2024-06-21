
import styles from "./home.module.css"

import { useState, useEffect, useContext, createContext } from "react";

// components
import Search from "../../components/searchComponent/search"
import Board from "../../components/boardComponent/Board";
import { Navigate, useLocation } from "react-router-dom";
import AuthModal from "../../components/authModal/AuthModal";



// could get this to outside helper function
async function getAllBoards(){
  const url = "http://127.0.0.1:3000/board"

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    // body: JSON.stringify({
    //   imgUrl: "https://picsum.photos/200/300?random=3",
    //   caption: "a brand new photo"
    // })
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


  useEffect(() =>{
    getAllBoards()
      .then(data => {
        setAllBoards(data)
      })
  }, [])

return (
    <div id={styles.homeContent}>
        <div id={styles.header}>
          <p>{user.name}</p>
          {
            (user.name == "Guest") && (
              <p onClick={()=> {setShowLogin(true)}}> Login </p>
            )
          }

          {
            (user.name != "Guest") && (
              <p onClick={()=> {setUser({name: "Guest", id: null})}}>
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
        <div id={styles.footer}> Footer </div>
    </div>
  )
}


export default Home;
