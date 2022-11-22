import styled from '@emotion/styled';
import Image from 'next/image';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ViewProductElement from './ViewProductElement';
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

const ListProduct = ({ product, market, props }: any) => {
    const isMobile = {props};
    const t = useTranslations("Product");  
    const results: any = []
    product.forEach((row: any) => {
        results.push(
          row    
        );

    });


    return (
        /* <ul className="list-group">{results} </ul>
        return <ViewProductElement key={index} {...row} />*/
        <MyDiv>
            <h1>{t("marketof")} {market.name} </h1>
            {results.map(( elem:any, index:any ) => {
                return <ViewProductElement key={index} {...elem}{...props} />
                {elem}
            })}

        </MyDiv>
    );
}

export default ListProduct;