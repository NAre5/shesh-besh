import React, { useEffect, memo } from 'react';

interface Props {
    className: string | undefined;
}

const GameCircle: React.FC<Props> = ({ className }) => (
    <div
        {...{ className }}
    />
)

export default memo(GameCircle);
