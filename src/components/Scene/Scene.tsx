import React, { FunctionComponent } from "react";
import Arm from "./components/Arm";
import ArmAndLever from "./components/ArmAndLever";
import Container from "./components/Container";
import Lever from "./components/Lever";

interface SceneProps {}

const Scene: FunctionComponent<SceneProps> = () => {
  const contaierRef = React.useRef<HTMLDivElement>(null);
  const armRef = React.useRef<HTMLDivElement>(null);

 

  return (
    <Container ref={contaierRef}>
        <ArmAndLever>
          
          <Arm className="arm" angel={10} ref={armRef} />
        <Lever />
      </ArmAndLever>
    </Container>
  );
};

export default Scene;
