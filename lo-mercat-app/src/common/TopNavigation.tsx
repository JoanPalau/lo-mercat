import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Home, Inventory, Shop, Store, Storefront } from '@mui/icons-material';
import styled from '@emotion/styled';
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";


const ImageCustom = styled.img`
  transition: transform .2s;
  margin-bottom: 10px;

}
`;
type Anchor = 'top' | 'left' | 'bottom' | 'right';

function loginBut(status: string) {
  console.log(status);
  if (status === "unauthenticated") {
    return <Button color="inherit" onClick={() => {window.location.href = '/auth/signin'}}>
    Login
    </Button>
  }
  return <></>
}


export default function TopNavigation() {
  const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const { status, data: session } = useSession();
    let hiMsg = ""
    if (session != null) {
      hiMsg = session.user.name;
    }
    
    let showDrawer = state['left'];
    // let setState = (x:any) => {}
    // let showDrawer = false;

    const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        
        setState({ ...state, [anchor]: open });
      };
      
      const list = (anchor: Anchor) => (
        <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        >
        <Box sx={{ mx: 'auto', height: 20 }}/>
        <ImageCustom src={'/user.png'} width={150} height={150}/>
          {hiMsg}
        </Grid>   
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '60vh' }}
        >
        <List>
          <ListItem disablePadding>
            <Link href="/protected" style={{ textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                <Home/>
              </ListItemIcon>
                <ListItemText primary={'Home'} />  
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/addstock" style={{ textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                <Inventory/>
              </ListItemIcon>
                <ListItemText primary={'Stock'} />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/joinMarket" style={{ textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                <Storefront/>
              </ListItemIcon>
                <ListItemText primary={'Markets'} />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/marketInfo" style={{ textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                <Store/>
              </ListItemIcon>
                <ListItemText primary={'Stands'} />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link href="/protected" style={{ textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                <Shop/>
              </ListItemIcon>
                <ListItemText primary={'Purchases'} />
            </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        >
        <Button variant="outlined" onClick={() => signOut({callbackUrl: '/'})}>
          Sign Out
        </Button>
        </Grid>   
    </Box>
  );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="nav">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
              <MenuIcon>
              </MenuIcon>
            </IconButton>
            <React.Fragment key={'left'}>
              <SwipeableDrawer
                anchor={'left'}
                open={showDrawer}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
              >
                {list('left')}
              </SwipeableDrawer>
            </React.Fragment>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lo Mercat
          </Typography>
            {loginBut(status)}
        </Toolbar>
      </AppBar>
    </Box>
  );
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" component="nav">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <IconButton onClick={toggleDrawer('left', true)}>
              <MenuIcon>
              </MenuIcon>
            </IconButton>
          </IconButton>
            <React.Fragment key={'left'}>
              <SwipeableDrawer
                anchor={'left'}
                open={showDrawer}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
              >
                {list('left')}
              </SwipeableDrawer>
            </React.Fragment>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lo Mercat
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}