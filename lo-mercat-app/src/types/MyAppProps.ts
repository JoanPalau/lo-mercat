import { AppProps } from 'next/app';

import { EmotionCache } from '@emotion/react';
import { NextPageWithLayout } from './NextPageWithLayout';


export type MyAppProps = AppProps & {
    Component: NextPageWithLayout,
    emotionCache?: EmotionCache,
    session: any,
  }