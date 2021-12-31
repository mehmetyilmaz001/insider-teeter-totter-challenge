import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { OBJECT_MOVE_DELAY } from '../../../constants';
import { calcFactor, formatMMSS } from '../../../helpers/Common';
import { Store } from '../../../redux/store';
import ObjectProps from '../../../types/ObjectProps';

interface InfoCardProps {
    
}


const Container = styled.div`
    width: 300px;
    background-color: white;
    border-radius: 20px;
    padding: 20px;


    table {
        th{
            text-align: left;
        }
    }
`
 
const InfoCard: FunctionComponent<InfoCardProps> = () => {
    const { isPlaying, speed, elapsedTime, leftObjects, rightObjects } = useSelector((state: Store) => state.scene);
    return ( 
        <Container>
                <table>
                    <tbody>
                        <tr>
                            <th>Is Playing</th>                          
                            <td>{isPlaying.toString()}</td>                          
                        </tr>
                        
                        <tr>
                            <th>Left Total Weight</th>                          
                            <td>{leftObjects.reduce(totalWeightFunc, 0 )}</td>                          
                        </tr>
                        <tr>
                            <th>Left Momentum</th>                          
                            <td>{calcFactor(leftObjects).toFixed(2)}</td>                          
                        </tr>
                        <tr>
                            <th>Right Total Weight</th>                          
                            <td>{rightObjects.reduce(totalWeightFunc, 0 )}</td>                          
                        </tr>
                        <tr>
                            <th>Right Momentum</th>                          
                            <td>{calcFactor(rightObjects).toFixed(2)}</td>                          
                        </tr>

                        <tr>
                            <th>Speed:</th>
                            <td>{(OBJECT_MOVE_DELAY - speed).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <th>Elapsed time:</th>
                            <td>{formatMMSS(elapsedTime)}</td>
                        </tr>
                        
                     </tbody>
                </table>
                
        </Container>
     );
}
 
export default InfoCard;

const totalWeightFunc = (total: number, obj: ObjectProps) => total + obj.weight;