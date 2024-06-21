
import styles from "./BoardPage.module.css"

import Search from "../../components/searchComponent/search"
import { useState, useEffect, useContext } from "react";
import Board from "../../components/boardComponent/Board";
import NewBoard from "../../components/addBoardModal/NewBoardModal";
import AuthModal from "../../components/authModal/AuthModal";

// router functions
import { Navigate, useLocation } from "react-router-dom";


// could get this to outside helper function
async function getAllBoardsFiltered(term, id){
  let url = `http://127.0.0.1:3000/filter/${term}`

  if (term == "my boards"){
    url = `http://127.0.0.1:3000/filter/myboards/${id}`
  }

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

async function addNewBoardApi(board){
  const url = `http://127.0.0.1:3000/board/`


  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(board)
  }

  const allBoards = await fetch(url, options)
  const resJson = await allBoards.json()
  console.log(resJson)
  return resJson
}

function BoardPage (props) {
  // stores search term and filter option
  const location = useLocation(); // initialize location for Navitate()


  const [searchTerm, setSearchTerm] = useState(location.state? location.state.searchTerm : "")
  const [filter, setFilter] = useState(location.state? location.state.filterTerm : "all")
  const [allBoards, setAllBoards] = useState([])
  const [showNewBoard, setShowNewBoard] = useState(false)
  const [cardPage, setCardPage] = useState(null)
  const [showLogin, setShowLogin]  = useState(false)
  const [deleted ,setDeleted] = useState(0)

  // user states
  const user = props.user
  const setUser = props.setUser

  // stores board visuals for bottom
  useEffect(() => {

    if (filter) {
      setSearchTerm("")

      if (!user.id && filter=="my boards"){
        alert("please login first")
        return;
      } else if (user.id && filter=="my boards") {
        getAllBoardsFiltered(filter.toLowerCase(), user.id)
        .then(data => {
          if (!data.error) {
            setAllBoards(data)
          }
        })

        return;
      }


      getAllBoardsFiltered(filter.toLowerCase())
        .then(data => {
          if (!data.error) {
            setAllBoards(data)
          }
        })
    }

  }, [filter, deleted])

  const setCardPageDetails = (boardDetails) => {
    setCardPage(boardDetails)
  }


  const addNewBoard = (board) => {
    addNewBoardApi(board)
      .then((data) => {
        setAllBoards((prev) => [...prev, data])
      })
  }

  useEffect(() => {
    if (searchTerm){
      // implement search later
      setFilter("")
    }
  }, [searchTerm])


  return (
    <div id={styles.boardContent}>

        {
          showNewBoard && (
            <NewBoard setShowNewBoard={setShowNewBoard} addNewBoard={addNewBoard} user={user} />
          )
        }

        {
          cardPage && (
              <Navigate to="/cards" state={cardPage} />
          )
        }

        {
          showLogin && (
              <AuthModal setShowLogin={setShowLogin} setUser={setUser}/>
          )
        }

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
        <Search id={styles.search} setSearchTerm={setSearchTerm} setFilter={setFilter} />
        <div id={styles.content}>

          {
            user.id && (
              <button onClick={() => setShowNewBoard(true)} style={{ height: "200px"}}> new board </button>
            )
          }

          {
            allBoards.map( (board) => {
              return( <Board key={board.id} setCardPage={setCardPageDetails} img={board.mediaUrl} description={board.description} board_id={board.id} cards={board.cards} authorId={board.authorId} setDeleted={setDeleted} user={user} /> )
            })
          }
        </div>
        <div id={styles.footer}> Footer </div>
      </div>
  )
}


export default BoardPage;
