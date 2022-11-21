import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, useContext, useState } from "react";
import { UserContext } from "../_app";
interface Props {}
import {useTranslations} from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    };
}
const SignIn: NextPage = (props): JSX.Element => {
    const isMobile = {props};
    const t = useTranslations("SignIn");
    
    const context = useContext(UserContext);
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
                <h3 className="Auth-form-title">{t("signin")}</h3>
                    <div className="form-group mt-3">
                        <label>{t("Email")}</label>
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
                        <label>{t("pass")}</label>
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
                        value={t("login")}
                        className="btn btn-primary"/>
                    </div>
            </div>
        </form>

    </div>)
};

export default SignIn;