import styled from '@emotion/styled';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import Image from 'next/image';

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
            headers:new Headers({ 'Content-Type': 'application/json', Accept: 'application/json',}),
            method: 'POST'
        }
    )
    console.log(x);
}

const AddProductForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        setStock(data).then(
        (res) =>{window.location.href = '/addstock'},
        (res) =>{console.log("error")}
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
                <Typography variant="h3">Product Name</Typography>
                <Box sx={{ mx: 'auto', height: 20 }}/>
                <TextField variant="filled" placeholder='Enter Product Name' {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })} />
                <div className="col-auto">
                    {errors.name && "Invalid value, This field is required"}
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