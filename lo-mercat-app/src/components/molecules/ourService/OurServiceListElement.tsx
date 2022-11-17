import styled from '@emotion/styled';
import { useRouter } from 'next/router'

import Image from 'next/image';
import ImageData from '@customTypes/ImageDataType';

const ImageTextListElement = styled.li`
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
`;

const ImageWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  text-align: center;
  `;

const ImageCustom = styled.img`
  transition: transform .2s;
  margin-bottom: 10px;
  
  &: hover{
    transform: scale(1.3);
}
`;


const OurServiceListElement = (props: OurServiceListElementProps) => {
  const router = useRouter()
  const { title, img, text, url } = props;
  return (
    <ImageTextListElement>
      <ImageWrapper >
        <h1>{title}</h1>
        <ImageCustom src={img.url} width={300} height={300} onClick={() => router.push(router.asPath+url)}/>
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
  url: string
}
export default OurServiceListElement;