import { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.90);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    color: white;
    font-size: 20px;
    gap: 8px;

    span {
        font-size: 40px;
    }
`

interface FailStateProps {
    onReply: () => void;
}
 
const FailState: FunctionComponent<FailStateProps> = ({onReply}) => {
    return ( 
        <Container className="fail-state">
            <span>Failed!</span>
            <button onClick={onReply}>REPLAY</button>
        </Container>
     );
}
 
export default FailState;