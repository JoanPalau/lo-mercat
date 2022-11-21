import styled from '@emotion/styled';
import Image from 'next/image';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';

import { useForm, SubmitHandler } from "react-hook-form";

const MyDiv = styled.div`

margin: auto;
width: 50%;
padding: 10px;

`;

type Inputs = {
    marketSelected: string,
    location: string
};

async function joinMarket(data: any) {
    let currentFarmer = "1";
    let x = await fetch(
        '/api/stand/',
        {        
            body: JSON.stringify({
                marketId: data.marketSelected,
                farmerId: "1",
                location: data.location
            }),
            headers:new Headers({ 'Content-Type': 'application/json', Accept: 'application/json',}),
            method: 'POST'
        }
    )
    console.log(x);
}

const JoinMarket = ({ market }: any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        joinMarket(data).then(
            (res) => { window.location.href = '/joinmarket' },
            (res) => { console.log("error") }
        )
    }
    const results: any = []
    market.forEach((market: any) => {
        results.push(
            <option key={market} value={market.id}>{market.name}</option>
        );
    });

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
                <Typography variant="h3">Select Market</Typography>
                    <div className='col-auto'>
                        <select className="form-control" {...register("marketSelected", { required: true })}>{results}</select>
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.marketSelected && "Invalid value, This field is required"}
                    </div>
                <div className='col-auto col-sm-4'>
                    <label htmlFor="Location">Your Location</label>
                </div>
                <div className='col-auto'>
                    <TextField variant="filled" placeholder='Enter Your Location' {...register("location", {pattern: /^[A-Za-z]+$/i })} />
                </div>
                <div className='col-auto col-sm-4'>
                    {errors.location && "Invalid value, This field is required"}
                </div>
                <Box sx={{ mx: 'auto', width: 40 }}/>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </Grid>
        </form>
    );
}

export default JoinMarket;