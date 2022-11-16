import Head from 'next/head';
import { SessionProvider } from "next-auth/react";
import { AppProps } from 'next/app';

import theme from '../src/theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { CacheProvider, EmotionCache } from '@emotion/react';

import createEmotionCache from '@common/createEmotionCache';
import { AppProvider } from '@common/AppContext';

import { NextIntlProvider } from 'next-intl';

import { AppContextInterface } from '../src/types/AppContext';
import { NavigationParams } from '../src/types/NavigationParams';

const UserContext= React.createContext(null);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache,
  session: any,
}

const defaultContext: AppContextInterface = {
  lang: '',
  navigation: {
    title: "Lo Mercat",
    nav: "Lo Mercat",
    value: undefined
  },
  data: {},
  handleLangChange: (context: AppContextInterface, newLang: string) => {
    const lang = newLang;
    return { ...context, lang };
  },
  handleNavigationChange: (context: AppContextInterface, newNavigation: NavigationParams) => {
    const navigation = newNavigation;
    return { ...context, navigation };
  },
  handleDataChange: (context: AppContextInterface, newData: object) => {
    const data = newData;
    return { ...context, data };
  }
}

export default function MyApp(props : MyAppProps) {

  const [user, setUser] = useState(null);
  const { Component, emotionCache = clientSideEmotionCache, pageProps, session } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <NextIntlProvider messages={pageProps.messages}>
          <UserContext.Provider value={{user, setUser}}>
            <SessionProvider session={session}>
              <AppProvider value={defaultContext}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Head>
                  <title>Lo Mercat</title>
                  <meta name="viewport" content="initial-scale=1, width=device-width" />
                  <meta name="description" content="Plataforma de comerç local on podràs trobar tot tipus de producte fresc provinent de les terres de ponent" />
                  <meta name="keywords" content="Lo mercat, Lleida, producte fresc, fruites, verdures, mercat" />
                  <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
              </AppProvider>
            </SessionProvider>
          </UserContext.Provider>
        </NextIntlProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export {UserContext};
