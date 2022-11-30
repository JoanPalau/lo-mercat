import styled from '@emotion/styled';
import Image from 'next/image';
import { useSession } from "next-auth/react";
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslations } from 'next-intl';

import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
    marketSelected: string,
    location: string
};

async function joinMarket(data: any, session: any) {
    let x = await fetch(
        '/api/stand/',
        {        
            body: JSON.stringify({
                marketId: data.marketSelected,
                farmerId: session.farmer.id,
                location: data.location
            }),
            headers:new Headers({ 'Content-Type': 'application/json', Accept: 'application/json',}),
            method: 'POST'
        }
    )
    console.log(x);
}

const JoinMarket = ({ market,props }: any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const isMobile = {props};
    const t = useTranslations("JoinMarket");
    const { status, data:session } = useSession();
    const onSubmit: SubmitHandler<Inputs> = data => {
        joinMarket(data, session).then(
            (res) => { window.location.href = '/farmers/joinmarket' },
            (res) => { console.log("error") }
        )
    }
    
    const JoinMarket = ({ market }: any) => {
        const { status, data:session } = useSession();
        const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
        const onSubmit: SubmitHandler<Inputs> = data => {
            joinMarket(data, session).then(
                (res) => { window.location.href = '/farmers/joinmarket' },
            (res) => { console.log("error") }
            )
        }
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
                <Typography variant="h3">{t("title")}</Typography>
                    <div className='col-auto'>
                        <Select className="form-control" {...register("marketSelected", { required: true })}>{results}</Select>
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.marketSelected && t("err")}
                    </div>
                </div>
                <Box sx={{ mx: 'auto', height: 20 }}/>
                <Typography variant="h5">{t("labloc")}</Typography>
                <div className='col-auto'>
                    <TextField variant="filled" placeholder={t("placeholderloc")} {...register("location", {pattern: /^[A-Za-z0-9]+$/i })} />
                </div>
                <div className='col-auto col-sm-4'>
                    {errors.location && t("err")}
                </div>
                <Box sx={{ mx: 'auto', height: 20 }}/>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </form>
    );
}

export default JoinMarket;