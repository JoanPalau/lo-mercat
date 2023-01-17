import { Provider } from 'react-redux';

import Head from 'next/head';
import { NextIntlProvider } from 'next-intl';
import { SessionProvider } from "next-auth/react";

import theme from '../src/theme';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { CacheProvider } from '@emotion/react';

import createEmotionCache from '@common/createEmotionCache';
import { MyAppProps } from '@customTypes/MyAppProps';
import NextNProgress from 'nextjs-progressbar';
import { wrapper } from 'redux/store';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props : MyAppProps) => {

  const [ orientation, setOrientation ] = useState<number>(0);
  const { store } = wrapper.useWrappedStore(props);
  const { Component, emotionCache = clientSideEmotionCache, pageProps, session } = props;

  const getLayout = Component.getLayout ?? ((page) => page)
  useEffect(() => {
    setOrientation(window.screen.orientation.angle);
    window.addEventListener('orientationchange', () => setOrientation(window.screen.orientation.angle));
  }, [])

  const screenNotSupported = () => {
    return <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

        <Grid item xs={3}>
          <b>
            <p>Screen orientation not supported :(</p>
            <p>Radu Asked us to put this message in.</p>
            <p>Hello Radu :D</p>
          </b>
        </Grid>   
        
      </Grid> 
    </>
  }


  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <NextIntlProvider messages={pageProps.messages}>
            <SessionProvider session={session}>
              <Provider store={store} >
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Head>
                  <title>Lo Mercat</title>
                  <meta name="viewport" content="initial-scale=1, width=device-width" />
                  <meta name="description" content="Plataforma de comerç local on podràs trobar tot tipus de producte fresc provinent de les terres de ponent" />
                  <meta name="keywords" content="Lo mercat, Lleida, producte fresc, fruites, verdures, mercat" />
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                {orientation === 0 ? <>
                  <NextNProgress />
                  {getLayout(<Component {...pageProps} />)}
                  </> : screenNotSupported()
                }
                
              </Provider>
            </SessionProvider>
        </NextIntlProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
