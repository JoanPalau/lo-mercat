import * as React from 'react';
import Link from './Link';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { BottomNavigationProps } from '@customTypes/BottomNavigationProps';

export default function GenericBottomNavigation(props: {actions: [BottomNavigationProps]}) {
  const [value, setValue] = React.useState('home');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
      <BottomNavigation sx={{ width: '100vw' }} value={value} onChange={handleChange}>
        {
        
        props.actions.map((setup,index) => {
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
