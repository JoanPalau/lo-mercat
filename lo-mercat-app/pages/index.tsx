import type { NextPage } from 'next'
import Button from 'react-bootstrap/Button';
import { PrismaClient } from '@prisma/client';
import {signIn} from "next-auth/react";
import { useSession } from "next-auth/react"
import RegisterForm from '../components/molecules/register/registerForm';

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
  const { data: session } = useSession()
  let name = session?.user?.name;

  async function setStock(){
    let x = await fetch(
      '/api/stock/create?product_id=cl9n3nbvm0002o0cnlxl0k1b6&farmer_id=cl9n3nbw1000ao0cn2tzhs3nq',
      {
        method: 'PUT'
      }
      )
    console.log(x);
  }
  return (
    <main id="landing-page">
      <p>
        This is the landing page for desktop view for user {name}
      </p>
      <Button>This is the test button</Button>
      <div><RegisterForm/></div>
    </main>
  )
}

export default DesktopLandingPage;
