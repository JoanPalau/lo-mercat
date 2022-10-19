import styled from '@emotion/styled';

import OurServiceListElement from './OurServiceListElement';

const sampleText = "Lorem ipsum dolor sit amet consectetur adipisicing emotionReact ";

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
      text: sampleText
    },
    {
      title: "Customer Info",
      img: {
        url: '/customer.svg',
        alt: 'Customer Information'
      },
      text: sampleText
    },
    {
      title: "Farmer Info",
      img: {
        url: '/farmer-info.svg',
        alt: 'Farmer Information'
      },
      text: sampleText
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