import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

function AuthProvider({children}) {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth') === 'true');
  const [user, setUser] = useState(null)

  const getUser = async () => {
    try {
      const auth_token = localStorage.getItem('auth_token')
      const res = await axios.get('http://127.0.0.1:8000/api/v1/auth/users/me/', {
        headers: {
          Authorization: `Token ${auth_token}`
        }
      })
      
      const userId = res.data.id
      
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/userlist/${userId}`, {
        headers: {
          Authorization: `Token ${auth_token}`
        }
      })

      setUser(response.data)
    }
    catch (error) {
      console.error(error)
      console.log('Недопустимый токен')
    }
  }

  useEffect(() => {
    localStorage.setItem('isAuth', isAuth);

    if (isAuth)
      getUser()

  }, [isAuth]);

  const value = {isAuth, setIsAuth, user}
    
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider