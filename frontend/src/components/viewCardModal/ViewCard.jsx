import styles from "./ViewCard.module.css"

// import Card component
import Card from "../cardComponent/Card";
import Comment from "../commentComponent/Comment";

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from "@fortawesome/free-solid-svg-icons"

// react hooks
import { useEffect, useState } from "react";

// could get this to outside helper function
async function getAllCardDetails(id){
    const DATABASE_URL = import.meta.env.VITE_DATABASE_URL

    const url = `${DATABASE_URL}/cards/${id}`


    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }

    const allBoards = await fetch(url, options)
    const resJson = await allBoards.json()

    return resJson.comments
}

async function submitNewComment (comment, card_id, authorId) {
    const DATABASE_URL = import.meta.env.VITE_DATABASE_URL

    const url = `${DATABASE_URL}/comments/`


    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        "text": comment,
        "author": authorId,
        "card" : card_id
      })
    }

    const allBoards = await fetch(url, options)
    const resJson = await allBoards.json()

    return resJson
}


function ViewCard(props){

    const [cardComments, setCardComments] = useState([])
    const [newComment, setNewComment] = useState("")

    // this works as temp auth check
    const user = props.user ? props.user : {name: "Guest", id: null}

    // close modal with props.setCurrentCard
    const handleClose = () =>{
        props.setCurrentCard(null)
    }

    const handleCommentChange = (e) => {
        setNewComment(e.target.value)
    }

    // use Context for the authorID
    const handleNewComment = () => {

        if(!user.id){
            alert("Please login to comment")
            return;
        }

        submitNewComment(newComment, props.card.id, user.id)
            .then( (data) => { setCardComments((prev)=> [...prev, data]) }
        )
    }

    useEffect(() => {
        getAllCardDetails(props.card.id)
            .then(data => {
                setCardComments(data)
            })
    }, [props.card])

    return (
        <div id={styles.card_modal}>
            <div id={styles.card_content}>
                <div id={styles.close_btn}>
                    <FontAwesomeIcon icon={faX}
                        onClick={handleClose}
                    />
                </div>
                <div id={styles.card}>
                    <Card card={props.card} />
                </div>
                <div id={styles.card_comments}>

                    {
                        cardComments.map((comment) => {
                            return (<Comment text={comment.text} authorId={comment.authorId} /> )
                        })
                    }
                </div>
                <div id={styles.new_comment}>
                    <input type="text" placeholder="enter new comment" onChange={handleCommentChange}/>
                </div>
                <div id={styles.send_btn}>
                    <button type="submit" onClick={handleNewComment}>add comment</button>
                </div>
            </div>
        </div>
    )
}

export default ViewCard;
