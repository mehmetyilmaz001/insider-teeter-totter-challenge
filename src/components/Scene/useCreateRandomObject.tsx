import randomColor from 'randomcolor';
import { getRandomNumberBetween } from '../../helpers/Common';
import WeightObject from '../WeightObject/WeightObject';
import { ObjectShape } from '../../enums/ObjectShape';
import Position from '../../types/Position';

const useCreateRandomObject = () => {

    const shapes = [ObjectShape.TRIANGLE, ObjectShape.SQUARE, ObjectShape.CIRCLE];
    const color = randomColor({luminosity: 'dark'});
    const value = getRandomNumberBetween(1,10);


    const _getObject =  (pos: Position) => <WeightObject
                position={pos}
                color={color} 
                value={value} 
                shape={shapes[getRandomNumberBetween(0, shapes.length - 1)]} 
            />

    return ({getObject: _getObject, value });
}


export default useCreateRandomObject;