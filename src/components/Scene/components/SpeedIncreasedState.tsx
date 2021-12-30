import { FunctionComponent } from "react";
import styled from "styled-components";

interface SpeedIncreasedStateProps {
    show: boolean;
    onClose: () => void;
}


const Container = styled.div<SpeedIncreasedStateProps>`
    display: ${({show}) => show ? 'flex' : 'none'};
    position: fixed;
    display: flex;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    color: white;
    background-color: red;
    width: 200px;
    height: 30px;
    left: 0;
    right: 0;
    top: 5;
    margin: auto;
`;
 
const SpeedIncreasedState: FunctionComponent<SpeedIncreasedStateProps> = (props) => {
    return ( 
        <Container {...props}>Speed Increased!</Container>
     );
}
 
export default SpeedIncreasedState;