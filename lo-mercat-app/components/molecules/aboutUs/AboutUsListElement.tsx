import styled from '@emotion/styled';

import Image from 'next/image';
import ImageData from '../../../commons/types/ImageDataType';

const ImageTextListElement = styled.li<{stripe: boolean}>`
  display: flex;
  flex-flow: ${props => props.stripe ? 'row' : 'row-reverse'} nowrap;
  justify-content: space-between;
  align-items: center;
`;

const AboutUsListElement = (props : AboutUsListElementProps) => {
    const {img, text, stripe} = props;
    return (
        <ImageTextListElement stripe={stripe}>
				<Image src={img.url} alt={img.alt} width={72} height={16} />
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