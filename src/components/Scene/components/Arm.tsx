import styled from "styled-components";
import { ARM_WIDTH } from "../../../constants";

const Arm = styled.div<{
    angel: number;
}>`
    transform: rotate(${({angel}) => angel}deg);
    position: absolute;
    width: ${ARM_WIDTH}px;
    height: 10px;
    background-color: brown;
    left: 0;
    right: 0;
    margin: auto;
    transition: all 0.2s;
    border-radius: 2px;
    border: solid 0.1px white
`;


export default Arm;


// transform: ` rotate(${Math.min(Math.abs(bending / 2),SEESAW_MAX_BENDING_PERCENTAGE) * (bending > 0 ? 1 : -1)}deg)`