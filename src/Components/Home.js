import axios from 'axios';
import React, { useEffect, useState } from 'react';
import List from './List';

function Home(props) {
    const [search, setSearch] = useState('')

    // useEffect(() => {
    //     console.log("search is..",search);
    // }, [search])

    const handleSearch = (e) => {
        setSearch(e?.target?.value?.toLowerCase())
    }

    return (
        <div>
            <input type="text" placeholder='Seach..' onChange={(e)=> handleSearch(e)}></input>
            <List search = {search}/>
        </div>
    );
}

export default Home;