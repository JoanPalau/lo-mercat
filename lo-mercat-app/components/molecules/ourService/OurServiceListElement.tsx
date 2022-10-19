import styled from '@emotion/styled';

import Image from 'next/image';
import ImageData from '../../../commons/types/ImageDataType';

const ImageTextListElement = styled.li`
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  margin-top: 20px;
`;

const ImageWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  `;



const OurServiceListElement = (props: OurServiceListElementProps) => {
  const { title, img, text } = props;
  return (
    <ImageTextListElement>
      <ImageWrapper>
        <h1>{title}</h1>
        <Image src={img.url} alt={img.alt} width={300} height={300} />
        <p>
          {text}
        </p>
      </ImageWrapper>
    </ImageTextListElement >
  )
}

interface OurServiceListElementProps {
  title: string,
  img: ImageData,
  text: string,
}
export default OurServiceListElement;