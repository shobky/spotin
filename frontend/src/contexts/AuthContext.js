import axios from "axios"
import React, {
    useContext,
    useState,
    useEffect
} from "react"

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const getCurrentUser = async () => {
        const res = await axios
            .get("http://localhost:5000/api/users/user", {
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

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    )
}