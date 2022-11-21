import styled from '@emotion/styled';
import Image from 'next/image';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslations } from 'next-intl';

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

const JoinMarket = ({ market,props }: any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const isMobile = {props};
    const t = useTranslations("JoinMarket");
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
        <MyDiv>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-3 mt-0'>
                    <div className='col-auto col-sm-4'>
                        <label htmlFor="form-control">{t("title")}</label>
                    </div>
                    <div className='col-auto'>
                        <select className="form-control" {...register("marketSelected", { required: true })}>{results}</select>
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.marketSelected && t("err")}
                    </div>
                </div>
                <div className='row g-3 mt-0'>
                    <div className='col-auto col-sm-4'>
                        <label htmlFor="Location">{t("labloc")}</label>
                    </div>
                    <div className='col-auto'>
                        <input className="form-control" placeholder={t("placeholderloc")} {...register("location", {pattern: /^[A-Za-z]+$/i })} />
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.location && t("err")}
                    </div>
                    <input type="submit"  value={t("button")} className="btn-primary" />
                </div>
            </form>
        </MyDiv >
    );
}

export default JoinMarket;