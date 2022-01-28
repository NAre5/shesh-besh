import React, { } from 'react';
// import Circle from '@material-ui/icons/FiberManualRecord';

interface Props {
    className: string | undefined;
}

export const GameCircle: React.FC<Props> = ({ className }) => {

    // useEffect(()=>{
    //     console.log('circle created');

    //     return () =>{
    //     console.log('circle unmounted');
    //     }

    // },[])

    return (
        // <Circle
        <div
            {...{ className }}
        />
    )
}