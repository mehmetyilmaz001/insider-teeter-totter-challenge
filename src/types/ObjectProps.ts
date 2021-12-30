import Position from "./Position";

export default interface ObjectProps {
    shape: string;
    weight: number;
    color: string;
    position: Position;
    side: "left" | "right";
  }