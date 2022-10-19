import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";
interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
    const[userInfo, setUserInfo] = useState({email: '', password:''});
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        signIn('credentials',{
            email: userInfo.email,
            password: userInfo.password,
            redirect: true,
            callbackUrl: '/protected'
        });
    };
    return(<div>
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
            <input 
            value={userInfo.email} 
            onChange={({ target })=>
                setUserInfo({... userInfo, email:target.value})
            }
            type='email' 
            placeholder='exemple@email.com'/>

            <input 
            value={userInfo.password}
            onChange={({ target })=>
                setUserInfo({... userInfo, password:target.value})
            } 
            type='password' 
            placeholder="********" />
            
            <input 
            type='submit' 
            value='Login' />

        </form>

    </div>)
};

export default SignIn;