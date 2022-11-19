import styled from '@emotion/styled';
import Image from 'next/image';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import ViewProductElement from './ViewProductElement';

import { useForm, SubmitHandler } from "react-hook-form";

const MyDiv = styled.div`

margin: auto;
width: 50%;
padding: 10px;

`;

type Inputs = {
    marketSelected: string,
};

const ListProduct = ({ product, market }: any) => {

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
            <h1>{market.name} Market</h1>
            {results.map(( elem:any, index:any ) => {
                return <ViewProductElement key={index} {...elem} />
                {elem}
            })}

        </MyDiv>
    );
}

export default ListProduct;