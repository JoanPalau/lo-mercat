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
};

async function removeMarket(data: any) {
    console.log(data);
    let currentFarmer = "1";
    let x = await fetch(
        '/api/stand/',
        {
            body: JSON.stringify({
                "farmer_id": currentFarmer,
                "market_id": data.market.id
            }),
            headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json', }),
            method: 'DELETE'
        }
    )
    //console.log(x);
}


const ListMarket = ({ join, props }: any) => {
    const isMobile = { props };
    const t = useTranslations("ListMarket");
    const results: any = []
    const rem: any = (data: any) => {
        removeMarket(data).then(
            (res) => { window.location.href = '/joinmarket' },
            (res) => { console.log("error") }
        )
    }
    join.forEach((join: any) => {
        results.push(
            <li className="list-group-item" >{join.market.name} <h3 onClick={(data) => rem(join)}>{t("remove")}</h3></li>
        );

    });


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <MyDiv>
            <h2>{t("tablename")}</h2>
            <ul className="list-group">{results} </ul>
        </MyDiv>
    );
}

export default ListMarket;