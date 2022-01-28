import React, { useEffect } from 'react';
import Circle from '@material-ui/icons/FiberManualRecord';

interface Props {
    // key: React.Key;
    className: string | undefined;
    onClick: () => void;

}

export const GameCircle: React.FC<Props> = ({ className, onClick }) => {

    useEffect(()=>{
        console.log('circle created');

        return () =>{
        console.log('circle unmounted');
        }
        
    },[])

    return (
        <Circle
            {...{ className, onClick }}
        />
    )
}