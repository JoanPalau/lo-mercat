import styled from '@emotion/styled';
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl';
import { Farmer, Product, Stand } from '@prisma/client';


const ImageTextListElement = styled.li`
  display: flex;
  flex-flow: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px,0px;

  margin-top: 20px;
`;

const ImageWrapper = styled.div`

  text-align: center;
  border: 1px solid;
  `;

const ImageCustom = styled.img`
  transition: transform .2s;
  margin-bottom: 10px;
  
  &: hover{
    transform: scale(1.3);
}
`;


const ViewProductElement = (props: ViewProductElementProps) => {
    const router = useRouter()
    const { cost,product, quantity ,farmer, stand} = props;
    const isMobile = {props};
    const t = useTranslations("Product");
    
    return (
        <ImageTextListElement>
            <ImageWrapper >
                <h2>{product.name}</h2>
                <p><h2>{t("price")}: {cost} € {t("kg")}</h2></p>
                <p>{t("remaining")}: {quantity} </p> 
                <p><h3>{t("produced")}: {farmer.name} </h3></p>
                <button>{t("button")}</button>
            </ImageWrapper>
        </ImageTextListElement >
    )

}

interface ViewProductElementProps {

    quantity: number,
    cost: number,
    farmerId: string,
    productId: string,
    product: Product,
    farmer:Farmer,
    stand: Stand,
    
}
export default ViewProductElement;