import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UseFetch = ({ url }) => {
    const [loading, setLoadign] = useState(true)
    const [data, setData] = useState()

    const getItems = async () => {
        const res = await axios
            .get(url)
            .catch((err) => console.log(err))
        const fetched = await res.data
        return fetched
    }
    useEffect(() => {
        getItems().then((data) => {
            setData(data)
            setLoadign(false)
        })
    })
    return { data, loading }
}

export default UseFetch