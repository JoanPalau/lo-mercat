import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Author from '../src/Author'
import Link from '../src/common/Link';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';
import Layout from '@common/Layout';

const About : NextPageWithLayout = () => {
  return (
    <Container maxWidth="lg" sx={{marginBottom: '56px'}}>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Project
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          {"You can find out more about the project and all it's contents in "}
          <Link href="https://github.com/JoanPalau/biometric-monitor-framework">{"this"}</Link>
          {" GitHub page."}
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
          Authors
        </Typography>
        <Author 
          name="Joan Palau Oncins" 
          title="Senior Full Stack Developer" 
          imgPath="/joan.jpg"/>
        <Author 
          name="Josep Maria Salvia Hornos" 
          title="Member of the Logic Optimization Group" 
          imgPath="/josepMaria.jpg"/>
      </Box>
    </Container>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
      {page}
      </Layout>
  )
}

export default About;
