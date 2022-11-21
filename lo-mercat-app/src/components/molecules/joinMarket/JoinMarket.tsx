import styled from '@emotion/styled';
import Image from 'next/image';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { useSession } from "next-auth/react";
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';

import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
    marketSelected: string,
    location: string
};

async function joinMarket(data: any) {
    const { status, data:session } = useSession();
    console.log(({
        marketId: data.marketSelected,
        farmerId:  "1",
        location: data.location
    }))
    let x = await fetch(
        '/api/stand/',
        {        
            body: JSON.stringify({
                marketId: data.marketSelected,
                farmerId:  "1",
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
            <MenuItem key={market} value={market.id}>{market.name}</MenuItem>
        );
    });

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-3 mt-0'>
                <Typography variant="h3">Select Market</Typography>
                    <div className='col-auto'>
                        <Select className="form-control" {...register("marketSelected", { required: true })}>{results}</Select>
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.marketSelected && "Invalid value, This field is required"}
                    </div>
                </div>
                <Box sx={{ mx: 'auto', height: 20 }}/>
                <Typography variant="h5">Your Location</Typography>
                <div className='col-auto'>
                    <TextField variant="filled" placeholder='Enter Your Location' {...register("location", {pattern: /^[A-Za-z]+$/i })} />
                </div>
                <div className='col-auto col-sm-4'>
                    {errors.location && "Invalid value, This field is required"}
                </div>
                <Box sx={{ mx: 'auto', height: 20 }}/>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </form>
    );
}

export default JoinMarket;