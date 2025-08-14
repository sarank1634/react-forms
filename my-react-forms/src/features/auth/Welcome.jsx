import {useSelector} from 'react-redux';
import {selectCurrentUser, selectCurrentToken} from '../authSlice';
import {Link} from 'react-router-dom';
import { authApiSlice } from '../authApiSlice';

const Welcome = () => {
    const user = useSelector(selectCurrentUser);
     const token = useSelector(selectCurrentToken);

     const welcome = user ? `Welcome ${user}!` : `welcome`
     const tokenAbbr = `${token.slice(0,9)}...`
    const content (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>Token: {tokenAbbr}</p>
            <p><Link to="/userlist">Go to the User List</Link></p>
        </section>
    )
    export const {
        useLoginMutation,
        
    }= authApiSlice;
}

export default Welcome;