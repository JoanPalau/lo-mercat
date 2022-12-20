import * as React from 'react';
import Link from './Link';
import Paper from '@mui/material/Paper';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useSession } from "next-auth/react";
import { BottomNavigationProps } from '@customTypes/BottomNavigationProps';

export default function GenericBottomNavigation(props: {actions: [BottomNavigationProps]}) {
  const [value, setValue] = React.useState('home');
  const { status, data: session } = useSession();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
        {
        props.actions.map((setup,index) => {
          if (status === "authenticated" && session.farmer)
            return (
              <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>               
                <Link href={"/farmers/joinmarket"}>
                  <BottomNavigationAction 
                    label="Join Market" 
                    icon={<AddBusinessIcon/>} 
                    sx={{color: '#4C6B36'}}/>
                </Link>
                <Link href={"/farmers/home"}>
                  <BottomNavigationAction 
                    label="Home" 
                    icon={<HomeIcon/>} 
                    sx={{color: '#4C6B36'}}/>
                </Link> 
                <Link href={"/farmers/addstock"}>
                  <BottomNavigationAction 
                    label="Add Stock" 
                    icon={<LibraryAddIcon/>} 
                    sx={{color: '#4C6B36'}}/>
                </Link>  
              </BottomNavigation>
            )
          if (status === "authenticated" && session.customer)
            return (
              <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>               
                <Link href={"/customers/order-history"}>
                  <BottomNavigationAction 
                    label="Order History" 
                    icon={<ShoppingBagIcon/>} 
                    sx={{color: '#4C6B36'}}/>
                </Link>
                <Link href={"/customers/home"}>
                  <BottomNavigationAction 
                    label="Home" 
                    icon={<HomeIcon/>} 
                    sx={{color: '#4C6B36'}}/>
                </Link> 
                <Link href={"/customers/purchase-history"}>
                  <BottomNavigationAction 
                    label="Add Stock" 
                    icon={<HistoryIcon/>} 
                    sx={{color: '#4C6B36'}}/>
                </Link>  
              </BottomNavigation>
              
            )
          else
            return (
              <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>               
                <Link href={"/landing"}>
                  <BottomNavigationAction 
                    label="Home" 
                    icon={<HomeIcon/>} 
                    sx={{color: '#4C6B36'}}/>
                </Link> 
              </BottomNavigation>
              
            )
        })
      }
    </Paper>
  );
}
