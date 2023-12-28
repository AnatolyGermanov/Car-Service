import {Navigate} from 'react-router-dom'

import useAuth from '../hooks/useAuth';

function RequireAuth({children}) {
    const {isAuth} = useAuth()

    if (!isAuth) {
        return <Navigate to='/' />
    }

  return children;
}

export default RequireAuth