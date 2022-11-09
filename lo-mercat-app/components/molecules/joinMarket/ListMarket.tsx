import styled from '@emotion/styled';
import Image from 'next/image';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';


import { useForm, SubmitHandler } from "react-hook-form";

const MyDiv = styled.div`

margin: auto;
width: 50%;
padding: 10px;

`;

type Inputs = {
    marketSelected: string,
};

async function removeMarket(data: any) {
    console.log(data);
    let currentFarmer = "cla9ub43w000inxerc0mtq95b";
    let x = await fetch(
        '/api/stand/remove?market_id=' + data.market.id + '&farmer_id=' + currentFarmer,
        {
            method: 'DELETE'
        }
    )
    //console.log(x);
}


const ListMarket = ({ join }: any) => {
    const results: any = []
    const rem: any = (data:any) =>{
        removeMarket(data).then(
        (res) =>{window.location.href = '/joinmarket'},
        (res) =>{console.log("error")}
        )
        }
    join.forEach((join: any) => {
        results.push(
            <li className="list-group-item" >{join.market.name} <h1 onClick={(data) => rem(join)}>Remove</h1></li>
        );
        
    });


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <MyDiv>
            <h2>You have a stand in the market</h2>
            <ul className="list-group">{results} </ul>
        </MyDiv>
    );
}

export default ListMarket;