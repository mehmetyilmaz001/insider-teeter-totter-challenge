import randomcolor from "randomcolor";
import {
  ARM_WIDTH,
  OBJECT_SHAPES,
  OBJECT_WEIGHT_MULTIPLIER,
  OBJECT_WEIGHT_RANGE,
} from "../constants";
import ObjectProps from "../types/ObjectProps";
import Position from "../types/Position";

export function getRandomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const createRandomLeftOffset = (weight: number) => {
  const offset = getRandomNumberBetween(
    0,
    (ARM_WIDTH / 2) - 10 - (weight * OBJECT_WEIGHT_MULTIPLIER)
  );

  return offset;
} 

export const createRandomObjectProps = (side: 'left' | 'right'): ObjectProps => {
  const color = randomcolor({ luminosity: "dark" });
  const weight =
    Math.floor(Math.random() * OBJECT_WEIGHT_RANGE[1]) + OBJECT_WEIGHT_RANGE[0];

  let offset = 0;

  if(side === 'left') {
    offset = createRandomLeftOffset(weight);
  }else{
    offset = getRandomNumberBetween(
      10 + (ARM_WIDTH / 2 ) + (weight * OBJECT_WEIGHT_MULTIPLIER),
      ARM_WIDTH
    );
  }
  

  const position: Position = { x: offset, y: 0 };
  const shape =
    OBJECT_SHAPES[getRandomNumberBetween(0, OBJECT_SHAPES.length - 1)];

  return {
    color,
    weight,
    shape,
    position,
    side,
  };
};
