import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useState } from "react";

const SignIn: NextPage = (props): JSX.Element => {
    const[userInfo, setUserInfo] = useState({email: '', password:'', role:'Farmer', name:''});
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        setUserInfo({... userInfo, role:'User'})
        e.preventDefault()
        // run inside `async` function
         
        signIn('credentials',{
            email: userInfo.email,
            password: userInfo.password,
            role:userInfo.role,
            redirect: true,
            callbackUrl: '/protected'
        });
        
    };
    return(<div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
                <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                            <br></br>
                            <input 
                            value={userInfo.email} 
                            onChange={({ target })=>
                                setUserInfo({... userInfo, email:target.value})
                            }
                            type='email' 
                            placeholder='exemple@email.com'/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <br></br>
                        <input 
                        value={userInfo.password}
                        onChange={({ target })=>
                            setUserInfo({... userInfo, password:target.value})
                        } 
                        type='password' 
                        placeholder="********" />
                    </div>
                    <div className="d-grid gap-2 mt-3">                    
                        <input 
                        type='submit' 
                        value='Login' 
                        className="btn btn-primary"/>
                    </div>
            </div>
        </form>

    </div>)
};

export default SignIn;