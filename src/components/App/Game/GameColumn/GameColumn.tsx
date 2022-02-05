import React, { memo, useMemo } from 'react';
import classNames, { Argument } from 'classnames';

import { Move } from 'models/Move';
import { DiceIdx } from 'utils/utils';
import { Column } from 'models/Column';
import { Player } from 'models/enums/Player';
import { PossibleMove } from 'models/PossibleMove';

import { useStyles } from './GameColumn.css';
import GameCircle from '../GameCircle/GameCircle';

export interface Props {
    column: Column;
    index: number;
    // onClick?: (index: number) => void;
    // resurrectCircle?: () => void;
    canResurrectCircle?: boolean;
    _classNames?: Argument[];
    turnPlayerNeedToReturn: boolean;
    turnPlayer: Player;
    onCircleClick: (selectedColumnIndex: number, diceIndex?: DiceIdx) => void;
    hintedMove: Move | undefined;
    setHintedMove: React.Dispatch<React.SetStateAction<Move | undefined>>;
    // playerSide: Player;
    // isHome: boolean;
    resurrectCircleToColumn: (selectedColumnIndex: number) => void
    // circlesEaten: MapPlayerTo<number>;
    possibleMoves: PossibleMove[];
    currDiceIdx: number;
}

const GameColumn: React.FC<Props> = (props) => {
    const {
        column, index, turnPlayerNeedToReturn, canResurrectCircle, _classNames, possibleMoves,
        turnPlayer, onCircleClick, setHintedMove, hintedMove, resurrectCircleToColumn, currDiceIdx
    } = props;

    const classes = useStyles();

    const possibleMoveFromColumn = useMemo<PossibleMove | undefined>(() => (
        possibleMoves.find(possibleMove => (possibleMove.startIndex === index) && (possibleMove.diceIdx === currDiceIdx))
    ), [possibleMoves, currDiceIdx]);

    const circlesClickable = (player: Player) => {
        return !turnPlayerNeedToReturn
            && (turnPlayer === player)
            && possibleMoveFromColumn
    };

    const onHoverEnter = () => {
        possibleMoveFromColumn && setHintedMove({ ...possibleMoveFromColumn });
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
            onClick={() => canResurrectCircle && resurrectCircleToColumn(index)}
            className={classNames(classes.column, _classNames, {
                // className={classNames(classes.column, {
                [classes.type1Column]: index % 2 === 0,
                [classes.type2Column]: index % 2 !== 0,
                // [classes.player1Column]: playerSide === Player.PLAYER1,
                // [classes.player2Column]: playerSide === Player.PLAYER2,
            })}
        >
            <div className={classes.columnIdx}>{index}</div>
            {[Player.PLAYER1, Player.PLAYER2]
                .filter(circlesPlayer => column.circles[circlesPlayer])
                .map(circlesPlayer => (
                    <div
                        key={circlesPlayer}
                        className={classNames(classes.circlesArea, {
                            [classes.clickable]: (turnPlayer === circlesPlayer) && circlesClickable(circlesPlayer),
                            [classes.disabled]: (turnPlayer === circlesPlayer) && !circlesClickable(circlesPlayer),
                            // [classes.otherDiceHint]: cursor: hint?
                        })}
                        onClick={() => {
                            if ((turnPlayer === circlesPlayer) && circlesClickable(circlesPlayer)) {
                                onCircleClick(index);
                                onHoverEnd();
                            }
                        }}
                        onMouseOver={() => {
                            if ((turnPlayer === circlesPlayer) && circlesClickable(circlesPlayer))
                                onHoverEnter();
                        }}
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
            {showHintedMove &&
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
