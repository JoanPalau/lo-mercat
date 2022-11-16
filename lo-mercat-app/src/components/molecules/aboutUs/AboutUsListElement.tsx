import styled from '@emotion/styled';

import Image from 'next/image';
import ImageData from '../../../commons/types/ImageDataType';

const ImageTextListElement = styled.li<{stripe: boolean}>`
  display: flex;
  flex-flow: ${props => props.stripe ? 'row' : 'row-reverse'} nowrap;
  justify-content: space-between;
  align-items: center;

  min-width: 60%;
`;

const AboutUsListElement = (props : AboutUsListElementProps) => {
    const {img, text, stripe} = props;
    return (
        <ImageTextListElement stripe={stripe}>
				<Image src={img.url} alt={img.alt} width={256} height={256} />
				<p>
					{text}
				</p>
			</ImageTextListElement>
    )
}

interface AboutUsListElementProps {
  img: ImageData,
  text: string,
  stripe: boolean
}
export default AboutUsListElement;