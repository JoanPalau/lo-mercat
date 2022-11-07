import Head from 'next/head'

const LMHead = (props : {title: string}) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta name="description" content="Plataforma de comerç local on podràs trobar tot tipus de producte fresc provinent de les terres de ponent" />
            <meta name="keywords" content="Lo mercat, Lleida, producte fresc, fruites, verdures, mercat" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
};

export default LMHead;