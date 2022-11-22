import styled from '@emotion/styled';
import Image from 'next/image';
import {Routes, Route, useNavigate} from 'react-router-dom';


import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from 'next/dist/server/api-utils';
// import Link from 'next/link';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import React from 'react';

type Inputs = {
    quantity: number,
    cost: number,
    productSelected: string,
};

async function setStock(data: any) {
    console.log(data);
    let currentFarmer = "1";
    let x = await fetch(
        '/api/stock/',
        {        
            body: JSON.stringify({
                product_id: data.productSelected,
                farmer_id: currentFarmer,
                quantity: data.quantity,
                cost: data.cost,
            }),
            headers:new Headers({ 'Content-Type': 'application/json', Accept: 'application/json',}),
            method: 'POST'
        }
    )
    //console.log(x);
}

const AddProductForm = ({ product }: any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data =>{
    setStock(data).then(
    (res) =>{window.location.href = '/protected'},
    (res) =>{console.log("error")}
    )
    }
    const results: any = [];
    let def:string = '';

    product.forEach((product: any) => {
        results.push(
            <MenuItem value={product.id}>{product.name}</MenuItem>
        );
        if (def == ''){
            def = product.id;
        }
    });
    console.log(def)

    const [sel, setSel] = React.useState(def);


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
            <Typography variant="h3">Set Stock</Typography>
            <Box sx={{ mx: 'auto', height: 20 }}/>
            <Typography variant="h5">Quantity</Typography>
            <div className='col-auto col-sm-4'>
                <TextField variant="filled" placeholder='Enter Quantity' className="form-control" {...register("quantity", { required: true, pattern: /^[0-9]+$/i })} />
            </div>
            <Box sx={{ mx: 'auto', height: 20 }}/>
            <div className='col-auto col-sm-4'>
                {errors.quantity && "Invalid value, This field is required"}
            </div>
            <Typography variant="h5">Cost</Typography>
                <div className='col-auto col-sm-4'>
                    <TextField variant="filled" className="form-control" placeholder='Enter Cost'{...register("cost", { required: true, pattern: /^[0-9]+$/i })} />
                </div>
                <div className='col-auto col-sm-4'>
                    {errors.cost && "Invalid value, This field is required"}
                </div>
            <Box sx={{ mx: 'auto', height: 20 }}/>
            <Typography variant="h5">Select Product</Typography>
            <Select
 {...register("productSelected", { required: true })} label="Product" >{results}</Select>
            <Box sx={{ mx: 'auto', height: 40 }}/>
            <div className='row g-3 mt-0'>
                <Grid container spacing={2}>
                    <Button type="submit" variant="outlined">
                        {errors.productSelected && "Invalid value, This field is required"}
                        <Link href="/addproduct">Add A new Product</Link>
                    </Button>
                    <Box sx={{ mx: 'auto', width: 20 }}/>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </div>
        </Grid>
        </form>
    );
}

export default AddProductForm;