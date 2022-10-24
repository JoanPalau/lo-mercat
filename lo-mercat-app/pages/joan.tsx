import type { NextPage } from 'next'
import styled from '@emotion/styled'

import AboutUsList from '../components/molecules/aboutUs/AboutUsList';

const MyHeader = styled.h1`
    color: red;
`;

const MyMagicFooter = styled.footer`
    background-color: black;
    color: white;
`

const Joan: NextPage = () => {
    return (
        <div>
            <MyHeader> This is my page </MyHeader>
            <AboutUsList />
            <MyMagicFooter>This is an awesome footer</MyMagicFooter>
        </div>
    );
}

export default Joan;