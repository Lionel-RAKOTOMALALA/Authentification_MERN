import {Navigate} from 'react-router-dom';
import {useAuthStore} from '../store/store.js'

export const AuthorizeUser = ({children})=>{
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    
    return children;
}

export const ProtectRoute = ({children}) =>{
    const username = useAuthStore().auth.username;
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    
    return children;
}