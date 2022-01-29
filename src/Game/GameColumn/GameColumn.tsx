import React, { memo, useMemo } from 'react';
import classNames, { Argument } from 'classnames';

import { Move } from '../../models/Move';
import { Column } from '../../models/Column';
import { useStyles } from './GameColumn.css';
import GameCircle from '../GameCircle/GameCircle';
import { Player } from '../../models/enums/Player';
import { columnsBoundries, columnsSplit, getOtherPlayer } from '../../utils/utils';
import { MapPlayerTo } from '../../models/MapPlayerTo';

export interface Props {
    column: Column;
    index: number;
    // onClick?: (index: number) => void;
    resurrectCircle?: () => void;
    _classNames?: Argument[];
    turnPlayerNeedToReturn: boolean;
    turnPlayer: Player;
    onCircleClick: (selectedColumnIndex: number, diceIndex?: 0 | 1) => void;
    getMoveParams: (startIndex: number, diceIndex?: 0 | 1 | undefined) => {
        endIndex: number;
        otherPlayerCirclesInDestination: number | undefined;
    };
    hintedMove: Move | undefined;
    setHintedMove: React.Dispatch<React.SetStateAction<Move | undefined>>;
    // playerSide: Player;
    // isHome: boolean;
    // resurrectCircleToColumn: (endIndex: number) => void;
    // circlesEaten: MapPlayerTo<number>;
}

const GameColumn: React.FC<Props> = (props) => {
    const {
        column, index, turnPlayerNeedToReturn, resurrectCircle, _classNames,
        turnPlayer, onCircleClick, getMoveParams, setHintedMove, hintedMove
    } = props;

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
        !!hintedMove && setHintedMove(undefined);
    };

    const showHintedMove = useMemo<boolean>(() => (
        !!hintedMove && (hintedMove.endIndex === index)
    ), [hintedMove]);

    // const canResurrectCircleToColumn = useMemo<boolean>(() => {
    //     const otherPlayerHoleIndex = columnsSplit[getOtherPlayer(turnPlayer)].hole;
    //     // const { endIndex: endIndexFromHoleWithDice0,
    //     const {
    //         otherPlayerCirclesInDestination: otherPlayerCirclesInDestinationFromHoleWithDice0
    //     } = getMoveParams(otherPlayerHoleIndex, 0);
    //     // const { endIndex: endIndexFromHoleWithDice1,
    //     const {
    //         otherPlayerCirclesInDestination: otherPlayerCirclesInDestinationFromHoleWithDice1
    //     } = getMoveParams(otherPlayerHoleIndex, 1);

    //     return turnPlayerNeedToReturn
    //         && true
    // }, [])


    return (
        <div
            onClick={() => resurrectCircle && resurrectCircle()}
            // onClick={() => canResurrectCircleToColumn && resurrectCircleToColumn(index)}
            className={classNames(classes.column, _classNames, {
            // className={classNames(classes.column, {
                [classes.type1Column]: index % 2 === 0,
                [classes.type2Column]: index % 2 !== 0,
                // [classes.player1Column]: playerSide === Player.PLAYER1,
                // [classes.player2Column]: playerSide === Player.PLAYER2,
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
                    onMouseOver={() => circlesClickable(circlesPlayer) && onHoverEnter()}
                    onMouseOut={onHoverEnd}
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

export default memo(GameColumn);
