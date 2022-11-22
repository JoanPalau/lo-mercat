import styled from '@emotion/styled';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';


import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string,
};



async function setStock(data: any) {
    console.log(data);
    let currentFarmer = "1";
    let x = await fetch(
        '/api/products/',
        {
            body: JSON.stringify({
                name: data.name,
                farmerId: currentFarmer,
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
    const onSubmit: SubmitHandler<Inputs> = data => {
        setStock(data).then(
            (res) => { window.location.href = '/addstock' },
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
                    Submit
                </Button>
            </Grid >
        </form >
    );
}

export default AddProductForm;