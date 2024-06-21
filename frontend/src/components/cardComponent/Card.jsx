import styles from "./Card.module.css"

// import hooks
import { useState } from "react"

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faTrash, faHeart, faUpDown, faArrowUp, faComment } from "@fortawesome/free-solid-svg-icons"

async function deleteCard (id) {
    const DATABASE_URL = import.meta.env.VITE_DATABASE_URL
    const url = `${DATABASE_URL}/cards/${id}`


    const options = {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        }
    }

    const allBoards = await fetch(url, options)
    const resJson = await allBoards.json()
    console.log(resJson)

    return resJson
}


function Card(props) {

    const card_details = props.card

    const [upvotes, setUpVotes] = useState(0)


    const openCardModal = (e) => {
        props.setCurrentCard(props.card)
    }

    const handleClose = (e) => {
        // the boards page needs to re-render, this state forces it to
        props.setDeleted(card_details.id)
        deleteCard(card_details.id)
    }

    const user = props.user ? props.user : {name: "Guest", id: null}

    return (
        <div className={styles.card}>


            <img src={card_details.gifUrl} />
            <p className={styles.text}>{card_details.text}</p>
            <p className={styles.upvotes}>upvotes:{upvotes}</p>

            {/* // would need to implement an upvote model to make sure a user doesnt click twice */}
            <div className={styles.actions}>
                <FontAwesomeIcon icon={faArrowUp} style={{ color: "green" }} onClick={()=> {setUpVotes(1)}}/>
                { ( (user.id == card_details.authorId) && (user.id)) && (<FontAwesomeIcon icon={faTrash} style={{ color: "red" }} onClick={handleClose}/> ) }
                {props.setCurrentCard &&(<FontAwesomeIcon icon={faComment} style={{ color: "blue" }} onClick={openCardModal} />)}
            </div>


        </div>
    )
}

export default Card;
