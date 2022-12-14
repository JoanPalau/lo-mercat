import * as React from 'react';
import Link from './Link';
import Paper from '@mui/material/Paper';
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
      <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>
        {
        
        props.actions.map((setup,index) => {
          if (status === "authenticated" && session.farmer)
            return (
              <BottomNavigationAction
                {...setup}
                component={Link}
                key={index}
              />
              
            )
          if (status === "authenticated" && session.customer)
            return (
              <BottomNavigationAction
                {...setup}
                component={Link}
                key={index}
              />
              
            )
          else
            return (
              <BottomNavigationAction
                {...setup}
                component={Link}
                key={index}
              />
              
            )
        })
      }
      </BottomNavigation>
    </Paper>
  );
}
