import React, { useCallback, useMemo } from 'react';
import classNames, { Argument } from 'classnames';
// import Circle from '@material-ui/icons/FiberManualRecord';

import { Column } from '../../models/Column';
import { Player } from '../../models/enums/Player';
import { useStyles } from './GameColumn.css'
import { GameCircle } from '../GameCircle/GameCircle';

interface Props {
    column: Column;
    index: number;
    onClick?: (index: number) => void;
    _classNames?: Argument[];
    turnPlayerNeedToReturn: boolean;
    turnPlayer: Player;
    onCircleClick: (selectedColumnIndex: number) => void;
}

export const GameColumn: React.FC<Props> = (props) => {
    const { column, index, onClick, _classNames, turnPlayerNeedToReturn, turnPlayer, onCircleClick } = props;
    const classes = useStyles();

    const circlesClickable = useCallback((player: Player) => {
        return !turnPlayerNeedToReturn && turnPlayer === player
    }, [turnPlayerNeedToReturn, turnPlayer]);

    return (
        <div
            onClick={() => onClick && onClick(index)}
            className={classNames(classes.column, _classNames, {
                [classes.type1Column]: index % 2 === 0,
                [classes.type2Column]: index % 2 !== 0,
            })}
        >
            {[Player.PLAYER1, Player.PLAYER2].map(circlesPlayer => (
                <>
                    {Array.from({ length: column.circles[circlesPlayer] }).map((_, circleIndex) => (
                        <GameCircle
                            key={circleIndex}
                            className={classNames(
                                classes.circle,
                                {
                                    [classes.clickable]: circlesClickable(circlesPlayer),
                                    [classes.player1Circle]: circlesPlayer === Player.PLAYER1,
                                    [classes.player2Circle]: circlesPlayer === Player.PLAYER2,
                                }
                            )}
                            onClick={() => circlesClickable(circlesPlayer) && onCircleClick(index)}
                        />
                    ))}
                </>
            ))}
        </div>
    )
};