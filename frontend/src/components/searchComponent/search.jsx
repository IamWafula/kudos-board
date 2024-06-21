import { useState } from 'react'
import styles from './search.module.css'

// import components
import { Navigate } from "react-router-dom";


function Search(props) {

    const filters = ["all", "my boards", "recent", "celebration", "thanks", "inspiration"]
    const [search, setSearch] = useState("")
    const [currentSelected, setCurrentSelected] = useState()

    const handleSearchSubmit = () => {
        props.setSearchTerm(search)
    }


    const handleSearchChange  = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div id={styles.search} >
            <input type="text" onChange={handleSearchChange} placeholder='enter search'/>
            <button type='submit' onClick={handleSearchSubmit}>search</button>
            <div className={styles.filters}>
            {
                filters.map((filter) => {
                    return (<p
                        id={ (currentSelected == filter) ? styles.current : "none" }
                        onClick={() => {
                            props.setFilter(filter)
                            setCurrentSelected(filter)
                        }}
                        key={filter}
                        >{filter}</p>)
                })
            }
            </div>
        </div>
    )
}

export default Search;
