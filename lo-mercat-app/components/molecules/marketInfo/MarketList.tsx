import styled from '@emotion/styled';
import Image from 'next/image';

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
border: solid 2px;
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

const MarketList = ({ markets }: any) => {
  const results: any = []
  markets.forEach((markets: any) => {
    results.push(
      
      <BorderListElement key={markets.id}>
              <ImageTextListElement><h2>{markets.name}</h2></ImageTextListElement>
              <ImageTextListElement>Location: {markets.location}</ImageTextListElement>
              <ImageTextListElement>Schedule: {markets.schedule}</ImageTextListElement>
              <ImageTextListElement><Image src={"/farmer-info.svg"} alt="" width={200} height={200} /></ImageTextListElement>
      </BorderListElement >
      
  );
});

return (
  <ImageTextList>
      {results}
  </ImageTextList>
);
}


export default MarketList;