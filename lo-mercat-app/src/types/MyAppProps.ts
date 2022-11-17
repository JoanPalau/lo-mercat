import { AppProps } from 'next/app';

import { EmotionCache } from '@emotion/react';
import { NextPageWithLayout } from './NextPageWithLayout';

export interface MyAppProps extends AppProps {
    Component: NextPageWithLayout,
    emotionCache?: EmotionCache,
    session: any,
}