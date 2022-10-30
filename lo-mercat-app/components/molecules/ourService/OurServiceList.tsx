import styled from '@emotion/styled';

import OurServiceListElement from './OurServiceListElement';

const ImageTextList = styled.ul`
list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding-left:0;
`;

const OurServiceList = () => {

  const data = [
    {
      title: "Market Info",
      img: {
        url: '/market-info.svg',
        alt: 'Market Information',
      },
      text: "Here we can see all the market statistics",
      url:"/marketinfo"
    },
    {
      title: "Customer Info",
      img: {
        url: '/customer.svg',
        alt: 'Customer Information'
      },
      text: "Here we can see all our customer statistics",
      url:"/customerinfo"
    },
    {
      title: "Farmer Info",
      img: {
        url: '/farmer-info.svg',
        alt: 'Farmer Information'
      },
      text: "Here we can see information about our farmers",
      url:"/farmerinfo"
    }
  ]
  return (
    <ImageTextList>
      {data.map((element, index) => {
        return <OurServiceListElement key={index} {...element} />
      })}
    </ImageTextList>
  );
}

export default OurServiceList;