import React from 'react';
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


    return (
        <div
            onClick={() => onClick && onClick(index)}
            className={classNames(classes.column, _classNames, {
                [classes.type1Column]: index % 2 === 0,
                [classes.type2Column]: index % 2 !== 0,
            })}
        >
            {Array.from({ length: column.circles[Player.PLAYER1] }).map((_, circleIndex) => (
                <GameCircle
                    key={circleIndex}
                    className={classNames(
                        classes.circle, classes.player1Circle,
                        { [classes.clickable]: !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1 }
                    )}
                    onClick={() => !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1 && onCircleClick(index)}
                />
            ))}
            {Array.from({ length: column.circles[Player.PLAYER2] }).map((_, circleIndex) => (
                <GameCircle
                    key={circleIndex}
                    className={classNames(
                        classes.circle, classes.player2Circle,
                        { [classes.clickable]: !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2 }
                    )}
                    onClick={() => !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2 && onCircleClick(index)}
                />
            ))}
        </div>
    )
};