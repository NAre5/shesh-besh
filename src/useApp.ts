import { useState } from 'react';

import { Column } from 'models/Column';

export const useApp = () => {
    const getInitialColumns = (): Column[] => {
        const initialColumns: Column[] = Array.from({ length: 24 }).map(
            (_, index) => ({
                player1_circles: 0,
                player2_circles: 0,
                // player1_circles: index % 2 === 0 ? 2 : 0,
                // player2_circles: index % 2 !== 0 ? 2 : 0,
            })
        );
        initialColumns[0].player1_circles = 2;
        initialColumns[5].player2_circles = 5;
        initialColumns[7].player2_circles = 3;
        initialColumns[11].player1_circles = 5;
        initialColumns[12].player2_circles = 5;
        initialColumns[16].player1_circles = 3;
        initialColumns[18].player1_circles = 5;
        initialColumns[23].player2_circles = 2;

        console.log(initialColumns);

        return initialColumns;
    };

    const [columns, setColumns] = useState<Column[]>(getInitialColumns());

    const onCircleClick = (index: number) => {

    }

    return {
        columns
    }
}