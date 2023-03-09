import axios from "axios"
import React, {
    useContext,
    useState,
    useEffect
} from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getCurrentUser = async () => {
        const res = await axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/users/user`, {
                withCredentials: true,
            })
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };

    useEffect(() => {
        getCurrentUser().then((data) => {
            setCurrentUser(data.user)
            setLoading(true)
        })
    }, [])

    const logout = async () => {
        await axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/users/logout`, {
                withCredentials: true,
            })
            .catch((err) => console.log(err))

        navigate('/login')
    }

    const value = {
        currentUser,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}