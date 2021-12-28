import styled from "styled-components";

const Arm = styled.div<{
    angel: number;
}>`
    transform: rotate(${({angel}) => angel}deg);
    position: absolute;
    width: 100%;
    height: 5px;
    background-color: brown;
    left: 0;
    right: 0;
    margin: auto;
    transition: all 0.2s;
`;


export default Arm;