import { ReactElement } from 'react';

import { Container, Grid } from '@mui/material';

import Home from "@mui/icons-material/Home";

import TopNavigation from './TopNavigation';
import GenericBottomNavigation from './BottomNavigation';

const myActions = 
    {
        label: "Home",
        value: "home",
        icon: <Home />,
        href: "/",
    }
const Layout = (props: { children: ReactElement }) => {
    return (
      <Grid>
        <TopNavigation />
        <main>
            <Container maxWidth="lg" sx={{ mt: "3rem", mb: "4rem"}}>
                {props.children}
            </Container>
        </main>
        <GenericBottomNavigation actions={[myActions]} />
      </Grid>
    )
  }
  
  export default Layout;