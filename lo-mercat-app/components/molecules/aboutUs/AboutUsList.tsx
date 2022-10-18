import styled from '@emotion/styled';

import AboutUsListElement from './AboutUsListElement';

const sampleText = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

const ImageTextList = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
`;

const AboutUsList = () => {

  const data = [
    {
      img: {
        url: '/vercel.svg',
        alt: 'Vercel Logo'
      },
      text: sampleText
    },
    {
      img: {
        url: '/vercel.svg',
        alt: 'Vercel Logo'
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