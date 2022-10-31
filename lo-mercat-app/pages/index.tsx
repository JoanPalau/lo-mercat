import type { NextPage } from 'next'
import Button from 'react-bootstrap/Button';

export async function getServerSideProps() {
  // Fetch data from external API
  //const res = await fetch('http://localhost:3000/api/hello')
  // const data = {};
  const products = {};
  console.log(products);
  // Pass data to the page via props
  return { props: { products } }
}

const DesktopLandingPage: NextPage = ({ data } : any) => {
  return (
    <main id="landing-page">
      <p>
        This is the landing page for desktop view
      </p>
      <Button>This is the test button</Button>
    </main>
  )
}

export default DesktopLandingPage;
