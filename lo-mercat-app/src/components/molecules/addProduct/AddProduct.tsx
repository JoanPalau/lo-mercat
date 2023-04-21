import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTranslations } from 'next-intl';


import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from 'next-auth/react';

type Inputs = {
    name: string,
};



async function setStock(data: any,session: any) {
    let x = await fetch(
        '/api/products/',
        {
            body: JSON.stringify({
                name: data.name,
                farmerId:  session.farmer.id,
            }),
            headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json', }),
            method: 'POST'
        }
    )
    console.log(x);
}

const AddProductForm = ({props}:any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const isMobile = {props};
    const t = useTranslations("AddProduct");
    const { status, data:session } = useSession();
    const onSubmit: SubmitHandler<Inputs> = data => {
        setStock(data,session).then(
            (res) => { window.location.href = '/farmers/addstock' },
            (res) => { console.log("error") }
        )
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)} className='row g-3'>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
                <Typography variant="h3">{t("productname")}</Typography>
                <Box sx={{ mx: 'auto', height: 20 }}/>
                <TextField variant="filled" placeholder={t("placeholder")} {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })} />
                <div className="col-auto">
                    {errors.name && t("productname")}
                </div>
                <Box sx={{ mx: 'auto', height: 20 }}/>
                <Button type="submit" variant="contained">
                    Registrar
                </Button>
            </Grid >
        </form >
    );
}

export default AddProductForm;