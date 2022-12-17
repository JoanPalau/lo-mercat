import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';

import OurServiceList from '../src/components/molecules/ourService/OurServiceList';


const Cri: NextPageWithLayout = () => {
    return (
        <div>
            <OurServiceList />
        </div>
    );
}

Cri.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default Cri;