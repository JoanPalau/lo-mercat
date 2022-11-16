import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface AuthorProps {
  name: string, 
  title: string,
  imgPath: string
}

export default function AuthorCard(props: AuthorProps) {

  const {name, title, imgPath} = props;

  return (
    <Card sx={{ display: 'flex', my: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Student at Universitat de Lleida
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={imgPath}
        alt={name + " profile picture"} 
      />
    </Card>
  );
}
