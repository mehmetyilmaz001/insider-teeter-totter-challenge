import randomcolor from "randomcolor";
import {
  ARM_MAX_BENDING_PERCENTAGE,
  ARM_WIDTH,
  HALF_ARM_WIDTH,
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


export const calcBending = (equity: number, rightObjects: ObjectProps[], leftObjects: ObjectProps[] ) => {


  const rightFactor = calcFactor(rightObjects);
  const leftFactor = calcFactor(leftObjects);

  const multiplyWithFactor = equity *  Math.abs(leftFactor + rightFactor);
  const bending = Math.ceil( equity < 0 ? Math.max(multiplyWithFactor, -ARM_MAX_BENDING_PERCENTAGE) : Math.min(multiplyWithFactor, ARM_MAX_BENDING_PERCENTAGE) );
  
  // console.log('equit => ', equity)
  // console.log('bending => ', bending)
  // dispatch(setBending(bending));

  return bending;
};


export const calcFactor = (objects: ObjectProps[]) => {
  const factor = objects.reduce((factor, obj) => {
    const objectDistance = Math.abs( obj.position.x - HALF_ARM_WIDTH );
    return factor + (objectDistance / (HALF_ARM_WIDTH))
  }, 0);

  return factor;
}

export const createRandomObjectProps = (side: 'left' | 'right'): ObjectProps => {
  const color = randomcolor({ luminosity: "dark" });
  const weight = Math.floor(Math.random() * OBJECT_WEIGHT_RANGE[1]) + OBJECT_WEIGHT_RANGE[0];

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


export const secondsToTime = (secs: number) =>
{
    secs = Math.round(secs);
    // var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        // "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}

export const formatMMSS = (s: number) => (s-(s%=60))/60+(9<s?':':':0')+s;
