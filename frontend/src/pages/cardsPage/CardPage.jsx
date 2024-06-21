
import { useState, useEffect } from "react";


// import components
import Board from "../../components/boardComponent/Board";
import Card from "../../components/cardComponent/Card.jsx"
import AuthModal from "../../components/authModal/AuthModal";


// import view card and add new card
import ViewCard from "../../components/viewCardModal/ViewCard"
import NewCard from "../../components/addCardComponent/AddCard";

// router functions
import { Navigate, useLocation } from "react-router-dom";

// css module
import styles from "./CardPage.module.css"


async function addNewCardApi(card){
    const DATABASE_URL = import.meta.env.VITE_DATABASE_URL

    const url = `${DATABASE_URL}/cards/`


    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(card)
    }

    const allBoards = await fetch(url, options)
    const resJson = await allBoards.json()

    return resJson
}



function CardPage(props) {

    const [board, setBoard] = useState(null);
    const [allCards, setAllCards] = useState([])

    // show card modal or not
    const [currentCard, setCurrentCard] = useState(null)
    const [showNewCard, setShowNewBoard] = useState(false)
    const [showLogin, setShowLogin]  = useState(false)
    const [deleted , setDeleted] = useState(0)


    // user states
    const user = props.user
    const setUser = props.setUser

    const location = useLocation();

    useEffect(() => {
        if (location.state){
            setBoard(location.state)
            setAllCards(location.state.cards? location.state.cards : [])
        }

    }, [location.state])

    const addNewCard = (card) => {
        addNewCardApi(card)
            .then((data) => {
                setAllCards((prev) => [...prev, data])
            })
    }

    return (
        <div id={styles.cardPage} >

            {/* realized that new boards have issue with undefined id, redirect to main page just incase */}
            {
            !board && !location.state.board_id && (
                <Navigate to="/boards"/>
            )
            }

            {
                showNewCard && (
                    <NewCard boardId={board.board_id} addNewCard={addNewCard} setShowNewBoard={setShowNewBoard} user_id={user.id} />
                )
            }

            {
                currentCard &&
                (
                    <ViewCard card={currentCard} setCurrentCard={setCurrentCard} user={user} />
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
            <div id={styles.board}>
                { board && (
                    <Board key={board.id} img={board.board_image} description={board.description} board_id={board.board_id} cards={board.cards} cardPage={true} />
                )
                }

                <button id={styles.add_card} type="submit" title="add card" onClick={()=> { setShowNewBoard(true) }}> add card </button>

            </div>

            <div id={styles.cards}>
                {  board && ( allCards.map((card) => {
                        return <Card card={card}  setCurrentCard={setCurrentCard} user={user} setDeleted={setDeleted}/>
                    })
                )}
             </div>

            <div id={styles.footer}>footer</div>
        </div>
    )
}


export default CardPage;
