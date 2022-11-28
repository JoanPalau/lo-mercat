import styled from '@emotion/styled';
import Image from 'next/image';
import { Grid, Link } from "@mui/material";
import { useSession } from "next-auth/react";
// import Link from "next/link";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import router from 'next/router';
import { useTranslations } from 'next-intl';

const ImageTextList = styled.ul`
list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-left:0;
`;

const BorderListElement = styled.ul`
border-radius: 3px;
list-style: none;
margin: 20px;
padding:0px 10px;
`;

const ImageTextListElement = styled.li`
display: flex;
flex-flow: nowrap;
justify-content: space-between;
align-items: center;
text-align:center;
margin-left: 10px;
margin-right: 10px;
margin-top: 10px;
`;

const ListElement = styled.li`

align-items: center;
text-align:center;
padding:0px;
`;

const MarketList = ({ markets, props}: any) => {
  const results: any = []
  const isMobile = {props};
  const t = useTranslations("MarketList");
  const redirect = (market:any,props:any) => {
    router.push('/market/'+market+'/viewproduct/');
  }
  markets.map((markets: any) => {
    results.push(
        <BorderListElement key={markets.id}>
        <Card sx={{
          display: 'block',
          transitionDuration: '0.3s',
        }}>
          <CardActionArea>
            <Link href="https://http.cat/400">
              <Image src={"/farmer-info.svg"} alt="" width={270} height={150} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {markets.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {t("loc")}:: {markets.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {t("sched")}: {markets.schedule}
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
    </BorderListElement>
  );
});

return (
  <ImageTextList>
      {results}
      
  </ImageTextList>
);
}


export default MarketList;