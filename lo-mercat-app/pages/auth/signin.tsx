import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { FormEventHandler, ReactElement, useContext, useState } from "react";
import { UserContext } from "../_app";
interface Props {}
import { PrismaClient } from '@prisma/client'
import { Box, Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

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
const SignIn: NextPageWithLayout = (props): JSX.Element => {
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
            callbackUrl: '/en/protected'
        });
    };
    return(<div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >

                    <Typography variant="h3">{t("signin")}</Typography>
                    <Box sx={{ mx: 'auto', height: 20 }}/>
                    <Typography variant="h5">{t("email")}</Typography>
                            <br></br>
                            <TextField 
                            value={userInfo.email} 
                            onChange={({ target })=>
                                setUserInfo({... userInfo, email:target.value})
                            }
                            type='email'
                            variant="filled"
                            placeholder='exemple@email.com'/>
                        <Box sx={{ mx: 'auto', height: 20 }}/>
                    <Typography variant="h5">{t("pass")}</Typography>
                        <br></br>
                        <TextField 
                        value={userInfo.password}
                        onChange={({ target }: any)=>
                            setUserInfo({... userInfo, password:target.value})
                        } 
                        variant="filled"
                        type='password' 
                        placeholder="********" />
                    <Box sx={{ mx: 'auto', height: 20 }}/>
                    <Button type='submit' variant="contained">
                    {t("login")}
                    </Button>
            </Grid>
        </form>

    </div>)
};

SignIn.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default SignIn;