import styled from '@emotion/styled';
import Image from 'next/image';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';


import { useForm, SubmitHandler } from "react-hook-form";

const MyDiv = styled.div`

margin: auto;
width: 50%;
padding: 10px;

`;

type Inputs = {
    marketSelected: string,
};

async function joinMarket(data: any) {
    let currentFarmer = "cla9ub43w000inxerc0mtq95b";
    let x = await fetch(
        '/api/stand/create?market_id=' + data.marketSelected + '&farmer_id=' + currentFarmer,
        {
            method: 'PUT'
        }
    )
    //console.log(x);
}

const JoinMarket = ({ market }: any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data =>{
    joinMarket(data).then(
    (res) =>{window.location.href = '/protected'},
    (res) =>{console.log("error")}
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
                        <label htmlFor="exampleFormControlSelect1">Select Market</label>
                    </div>
                    <div className='col-auto'>
                        <select className="form-control" {...register("marketSelected", { required: true })}>{results}</select>
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.marketSelected && "Invalid value, This field is required"}
                    </div>
                    <input type="submit" className="btn-primary" />
                </div>
            </form>
        </MyDiv >
    );
}

export default JoinMarket;