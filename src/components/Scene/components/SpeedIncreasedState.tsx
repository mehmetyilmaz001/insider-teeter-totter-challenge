import { FunctionComponent } from "react";
import styled from "styled-components";

interface SpeedIncreasedStateProps {
    show: boolean;
    // onClose: () => void;
}


const Container = styled.div<SpeedIncreasedStateProps>`
    display: ${({show}) => show ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    position: fixed;
    transform: scale(${({show}) => show ? '1.2' : '1'});
    transition: all 0.3s ease-in-out;
    color: white;
    background-color: orange;
    width: 200px;
    height: 30px;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    border-radius: 10px;
    text-align:center;
`;
 
const SpeedIncreasedState: FunctionComponent<SpeedIncreasedStateProps> = (props) => {
    return ( 
        <Container {...props}>Speed Increased!</Container>
     );
}
 
export default SpeedIncreasedState;