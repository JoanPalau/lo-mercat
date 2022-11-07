import styled from '@emotion/styled';

import AboutUsListElement from './AboutUsListElement';

const sampleText = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

const ImageTextList = styled.ul`
  list-style: none;
  padding: 0;
  margin: auto;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const AboutUsList = () => {

  const data = [
    {
      img: {
        url: '/fresh.png',
        alt: 'fresh products'
      },
      text: sampleText
    },
    {
      img: {
        url: '/fruit.png',
        alt: 'Fruits and vegetables'
      },
      text: sampleText
    }
  ]
	return (
		<ImageTextList>
			{data.map((element, index) => {
        return <AboutUsListElement key={index} {...element} stripe={!!(index % 2)} />
      })}
		</ImageTextList>
	);
}

export default AboutUsList;