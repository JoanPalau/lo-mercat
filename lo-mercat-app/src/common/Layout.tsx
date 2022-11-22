import { ReactElement } from 'react';

import { Grid } from '@mui/material';


const Layout = (props: { children: ReactElement }) => {
    return (
      <Grid>
        <nav>
            This is the future navBar
        </nav>
        <aside>
            This is the future Drawer section
        </aside>
        <main>
            {props.children}
        </main> 
        <footer>
            This is the future footer
        </footer>
      </Grid>
    )
  }
  
  export default Layout;