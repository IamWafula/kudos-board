import { useState } from 'react'
import styles from './search.module.css'

// import components
import { Navigate } from "react-router-dom";


function Search(props) {

    const filters = ["all", "my boards", "recent", "celebration", "thanks", "inspiration"]
    const [search, setSearch] = useState("")

    const handleSearchSubmit = () => {
        props.setSearchTerm(search)
    }


    const handleSearchChange  = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div id={styles.search} >
            <input type="text" onChange={handleSearchChange}/>
            <button type='submit' onClick={handleSearchSubmit}>search</button>
            <div className={styles.filters}>
            {
                filters.map((filter) => {
                    return (<p
                        onClick={() => {
                            props.setFilter(filter)
                        }}
                        >{filter}</p>)
                })
            }
            </div>
        </div>
    )
}

export default Search;
