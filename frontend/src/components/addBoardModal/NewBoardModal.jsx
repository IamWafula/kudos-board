import styles from "./NewBoardModal.module.css"

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


export default function NewBoard(props) {

    const [searchTerm, setSearchTerm] = useState("")
    const [resultGifs, setResultGifs] = useState([])

    // New Board Details
    const [currentGif, setCurrentGif] = useState("")
    const [description, setDescription] = useState("")
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState(2)


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

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handeTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handeCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    // change authorID here to use Context
    const handleSubmit = () => {
        props.addNewBoard({
            title: title,
            mediaUrl: currentGif.images.original.url,
            description: description,
            categoryId: category,
            authorId: props.user.id
        })

        props.setShowNewBoard(false)
    }




    return(
        <div id={styles.board_modal}>
            <div id={styles.board_content}>

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

                <div id={styles.title_category} >

                    <input placeholder="enter board title" onChange={handeTitleChange}/>


                    <select onChange={handeCategoryChange}>
                        <option value={2}>Thank you Board</option>
                        <option value={1}>Celebration Board</option>
                        <option value={3}>Inspiration Board</option>
                    </select>
                </div>

                <div id={styles.description} >
                    <input placeholder="enter board description" onChange={handleDescriptionChange}/>
                </div>

                <div id={styles.submit}>
                    <button onClick={handleSubmit}>add board</button>
                </div>

            </div>

        </div>
    )
}
