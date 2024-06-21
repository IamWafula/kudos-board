import styles from "./AddCard.module.css"

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from "@fortawesome/free-solid-svg-icons"

// import react hooks
import { useState, useEffect} from "react"

async function getGifs(search_term){

    const url = `https://api.giphy.com/v1/gifs/search?q=${search_term}&api_key=lK3qSYKbcQsB2Dgo7cr4U76irTyFLv8i`

    const response = await fetch(url)
    const resJson = await response.json()

    return resJson.data
}


export default function NewCard(props) {

    const [searchTerm, setSearchTerm] = useState("")
    const [resultGifs, setResultGifs] = useState([])

    // New Board Details
    const [currentGif, setCurrentGif] = useState("")
    const [text, setText] = useState("")


    const handleClose = () => {
        props.setShowNewBoard(false)
    }

    const handleSearch = () => {
        getGifs(searchTerm)
            .then((data) => {
                setResultGifs(data)
            })
    }

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    // change authorID here to use Context
    const handleSubmit = () => {

        props.addNewCard({
            text: text,
            gifUrl: currentGif.images.original.url,
            author: props.user_id,
            board: props.boardId
        })
        props.setShowNewBoard(false)
    }




    return(
        <div id={styles.card_modal}>
            <div id={styles.card_content}>

                <div id={styles.search}>
                    <input placeholder="enter gif name" onChange={handleChange} />
                    <button onClick={handleSearch}>search</button>
                </div>

                <div id={styles.close_btn}>
                    <FontAwesomeIcon icon={faX}
                        onClick={handleClose}
                    />
                </div>

                <div id={styles.gif_results}>
                    {
                        resultGifs.map( (gif) => {
                            return ( <img className={styles.gif_image} src={gif.images.original.url} key={gif.id}
                                style={{ border: (currentGif == gif) ? "solid 2px aliceblue" : "none" }}

                                onClick={() => {setCurrentGif(gif)}}
                            /> )
                        })
                    }

                </div>

                <div id={styles.text} >
                    <input placeholder="enter card text" onChange={handleTextChange}/>
                </div>

                <div id={styles.submit}>
                    <button onClick={handleSubmit}>add card</button>
                </div>

            </div>

        </div>
    )
}
