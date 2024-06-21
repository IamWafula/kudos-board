import styles from "./Comment.module.css"
import { useEffect, useState } from "react"

async function getUserName(id) {


    if(!id){
        return "guest"
    }

    const DATABASE_URL = import.meta.env.VITE_DATABASE_URL

    const url = `${DATABASE_URL}/users/${id}`

    const options = {
        method: "GET",
        headers : {
            "Content-Type": "application/json",
        }
    }

    const userDetails = await fetch(url, options)
    const resJson = await userDetails.json()

    return resJson.name
}


function Comment(props) {

    const [userName, setUserName] = useState("")

    useEffect(() => {
        getUserName(props.authorId)
            .then((author_name) => {
                setUserName(author_name)
            })
    }, [props.authorId])


    return (
        <div className={styles.comment}>
            <p className={styles.text}>{props.text}</p>
            <p className={styles.username}>{userName}</p>
        </div>
    )
}

export default Comment;
