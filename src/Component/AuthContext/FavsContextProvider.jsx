import React, { createContext, use, useContext, useEffect, useState } from 'react'
import { AuthUserContext } from './AuthContextProvider.jsx';
import axios from 'axios';
export let Favs = createContext()

export default function FavsContextProvider({ children }) {
    let [numFav, setNumFav] = useState(0)
    let { token } = useContext(AuthUserContext);
    let headerOption = {
        headers: {
            token: token
        }
    }
    let baseUrl = `https://ecommerce.routemisr.com/api/v1/wishlist`

    function getFavs() {
        return axios.get(baseUrl, headerOption)
    }
    function addFav(id) {
        let data = { productId: id }
        return axios.post(baseUrl, data, headerOption)
    }
    function deleteFav(id) {
        return axios.delete(`${baseUrl}/${id}`, headerOption)
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getFavs().then((res) => setNumFav(res.data.count))
                .catch(() => setNumFav(0));
        } else {
            setNumFav(0);
        }
    }, [token]);




    return <Favs.Provider value={{ getFavs, addFav, deleteFav, numFav, setNumFav }}>{children}</Favs.Provider>;
}
