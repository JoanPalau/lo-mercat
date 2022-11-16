import type { NextPage } from 'next'

import Styles from 'styles/pages/landing-page.module.scss';
import LoginFooter from '../../src/components/deprecated/footer/mobile/Footer';
import TextCarousel from '../../src/components/deprecated/textCarousel/TextCarousel';

export async function getServerSideProps() {
  // Fetch data from external API
  //const res = await fetch('http://localhost:3000/api/hello')
  const data = {};
  // Pass data to the page via props
  return { props: { data } }
}

const DesktopLandingPage: NextPage = ({ data } : any) => {
  return (<div className={Styles.mobile}>
    <main id="landing-page">
        <TextCarousel />
    </main>
    <LoginFooter />
  </div>
  )
}

export default DesktopLandingPage;