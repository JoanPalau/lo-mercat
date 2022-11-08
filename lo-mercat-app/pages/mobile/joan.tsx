import type { NextPage } from 'next'

export async function getServerSideProps() {
  // Fetch data from external API
  //const res = await fetch('http://localhost:3000/api/hello')
  const data = {};
  // Pass data to the page via props
  return { props: { data } }
}

const Joan: NextPage = ({ data } : any) => {
  return (
    <div>
      Hello Mobile World!
    </div>
  )
}

export default Joan