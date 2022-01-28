import React, { useCallback, useMemo } from 'react';
import classNames, { Argument } from 'classnames';
// import Circle from '@material-ui/icons/FiberManualRecord';

import { Column } from '../../models/Column';
import { Player } from '../../models/enums/Player';
import { useStyles } from './GameColumn.css'
import { GameCircle } from '../GameCircle/GameCircle';
import { columnsBoundries } from '../../utils/utils';
import { Move } from '../../models/Move';

export interface Props {
    column: Column;
    index: number;
    onClick?: (index: number) => void;
    _classNames?: Argument[];
    turnPlayerNeedToReturn: boolean;
    turnPlayer: Player;
    onCircleClick: (selectedColumnIndex: number) => void;
    getMoveParams: (startIndex: number) => {
        endIndex: number;
        otherPlayerCirclesInDestination: number | undefined;
    };
    hintedMove: Move | undefined;
    setHintedMove: React.Dispatch<React.SetStateAction<Move | undefined>>
}

export const GameColumn: React.FC<Props> = (props) => {
    const { column, index, onClick, _classNames, turnPlayerNeedToReturn, turnPlayer, onCircleClick, getMoveParams, setHintedMove, hintedMove } = props;
    const classes = useStyles();

    const { endIndex, otherPlayerCirclesInDestination } = getMoveParams(index);

    const circlesClickable = (player: Player) => {
        //TODO: if end index is one of ends colunms
        //TODO: if end index is passed hole column

        return !turnPlayerNeedToReturn
            && (turnPlayer === player)
            && !((((endIndex === columnsBoundries.min) || (endIndex === columnsBoundries.max)) ||
                (otherPlayerCirclesInDestination === undefined) ||
                (otherPlayerCirclesInDestination > 1)))
        // }
    };

    const onHoverEnter = () => {
        setHintedMove({ startIndex: index, endIndex });
    }

    const onHoverEnd = () => {
        setHintedMove(undefined);
    };

    const showHintedMove = useMemo<boolean>(() => (
        !!hintedMove && (hintedMove.endIndex === index)
    ), [hintedMove])

    // console.log(456);
    

    return (
        <div
            onClick={() => onClick && onClick(index)}
            className={classNames(classes.column, _classNames, {
                [classes.type1Column]: index % 2 === 0,
                [classes.type2Column]: index % 2 !== 0,
            })}
        >
            {[Player.PLAYER1, Player.PLAYER2].map(circlesPlayer => (
                <div
                    key={circlesPlayer}
                    className={classNames({
                        [classes.clickable]: circlesClickable(circlesPlayer),
                        [classes.disabled]: !circlesClickable(circlesPlayer),
                    })}
                    onClick={() => { if (circlesClickable(circlesPlayer)) { onCircleClick(index); onHoverEnd(); } }}
                    onMouseEnter={() => circlesClickable(circlesPlayer) && onHoverEnter()}
                    onMouseLeave={onHoverEnd}
                >
                    {Array.from({ length: column.circles[circlesPlayer] }).map((_, circleIndex) => (
                        <GameCircle
                            key={circleIndex}
                            className={classNames(
                                classes.circle,
                                {
                                    [classes.player1Circle]: circlesPlayer === Player.PLAYER1,
                                    [classes.player2Circle]: circlesPlayer === Player.PLAYER2,
                                }
                            )}
                        />
                    ))}
                </div>
            ))}
            {
                showHintedMove &&
                <GameCircle
                    className={classNames(
                        classes.circle,
                        {
                            [classes.player1HintedCircle]: turnPlayer === Player.PLAYER1,
                            [classes.player2HintedCircle]: turnPlayer === Player.PLAYER2,
                        }
                    )}
                />
            }
        </div>
    )
};