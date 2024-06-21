import { useState, Alert } from 'react';
import styles from './Board.module.css'

import { Navigate, useLocation } from "react-router-dom";


// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons"
import CardPage from '../../pages/cardsPage/CardPage';


async function deleteBoard (id) {
    const DATABASE_URL = import.meta.env.VITE_DATABASE_URL
    const url = `${DATABASE_URL}/board/${id}`


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



function Board(props) {

    const imageUrl = props.img;
    const description = props.description;
    const board_id = props.board_id
    const cards = props.cards
    const title = props.title

    const [favorited, setFavorited] = useState(false)


    const handleClose = (e) => {
        e.stopPropagation()

        // the boards page needs to re-render, this state forces it to
        props.setDeleted(board_id)
        deleteBoard(board_id)
    }

    const user =  props.user ? props.user : {name: "Guest", id: null}


    if (!description){
        return (
            <div className={styles.main_page_board }>
                {
                    !(props.authorId == user.id && !props.cardPage) && (
                        <FontAwesomeIcon icon={faHeart} style={{ color: favorited  ? "red" : "white" }}
                            onClick={() => {e.stopPropagation();  setFavorited(!favorited)}}
                        />
                    )
                }
                <img src={imageUrl}></img>
            </div>
        )
    }

    const handleClickBoard = () => {

        const board = {
            board_id : board_id,
            board_image : imageUrl,
            cards : cards,
            description: description
        }

        props.setCardPage(board)
    }

    return (
        <div  className={styles.main_board} onClick={handleClickBoard}>

            {
                (props.authorId == user.id && !props.cardPage) && (
                    <FontAwesomeIcon icon={faTrash}
                        onClick={handleClose}
                    />
                )
            }

            {
                // very confusing logic here --> summary : I only want the delete option available on the boardPage, not Card Page and not when the current user isnt the author
                !((props.authorId == user.id) && !props.cardPage) && (
                    <FontAwesomeIcon icon={faHeart} style={{ color: favorited  ? "red" : "white" }}
                            onClick={(e) => { e.stopPropagation();  setFavorited(!favorited)}}
                    />
                )
            }
            <img src={imageUrl}></img>
            <h4>{title}</h4>
            <p> {description} </p>
        </div>
    )
}

export default Board;
