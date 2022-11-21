import styled from '@emotion/styled';
import Product from '@types/ProductType';
import Farmer from '@types/FarmerType';
import { useRouter } from 'next/router'
import Stand from '@types/StandType';


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

    
    return (
        <ImageTextListElement>
            <ImageWrapper >
                <h2>{product.name}</h2>
                <p><h2>Price: {cost} € per kilo</h2></p>
                <p>Remaining in stock: {quantity} </p> 
                <p><h3>Farmed By: {farmer.name} </h3></p>
                <button>Add to cart</button>
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