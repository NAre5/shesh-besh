import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Move } from 'models/Move';
import { DiceIdx } from 'utils/utils';
import { Dices } from 'models/GameTurn';
import { AppDispatch } from 'redux/store';
import { Player } from 'models/enums/Player';
import { MapPlayerTo } from 'models/MapPlayerTo';
import { PossibleMove } from 'models/PossibleMove';
import { resetMoves, swapDices, switchTurns, undoMove } from 'redux/Game.slice';

import { useStyles } from './GameUtils.css';
import GameCircle from '../GameCircle/GameCircle';

interface UtilsButton {
    title: string;
    enabled: boolean;
    onClick: () => void;
}

interface Props {
    turnPlayer: Player;
    dices: Dices;
    circlesEaten: MapPlayerTo<number>;
    moves: Move[];
    gameEnded: boolean;
    possibleMoves: PossibleMove[];
    currDiceIdx: DiceIdx;
}

export const GameUtils: React.FC<Props> = (props) => {
    const { turnPlayer, dices, circlesEaten, moves, gameEnded, possibleMoves, currDiceIdx } = props;
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const allowSwapDices = useMemo<boolean>(() => (
        (
            (dices[0] === dices[1])
            || (moves.length === 0)
        )
        && !gameEnded
        //TODO: && im the player
    ), [dices, moves]);

    const allowUndoMove = useMemo<boolean>(() => (
        (moves.length !== 0)
        && !gameEnded
        //TODO:  && im the player
    ), [dices, moves]);

    const allowEndTurn = useMemo<boolean>(() => (
        possibleMoves.length === 0
        && !gameEnded
        //TODO:  && im the player
    ), [dices, moves]);

    const utilButtons: UtilsButton[] = [
        {
            title: 'Swap Dices', enabled: allowSwapDices,
            onClick: () => {
                if (!(dices[0] === dices[1]))
                    dispatch(swapDices())
            }
        },
        { title: 'Undo Move', enabled: allowUndoMove, onClick: () => dispatch(undoMove()) },
        { title: 'Reset Moves', enabled: allowUndoMove, onClick: () => dispatch(resetMoves()) },
        { title: 'End Turn', enabled: allowEndTurn, onClick: () => dispatch(switchTurns()) },
    ]

    return (
        <div className={classes.root}>
            <div className={classes.row} >
                {turnPlayer}
                <GameCircle
                    className={classNames(
                        classes.circle, {
                        [classes.player1Circle]: turnPlayer == Player.PLAYER1,
                        [classes.player2Circle]: turnPlayer == Player.PLAYER2,
                    }
                    )}
                />
                {' turn'}
            </div>
            <div className={classes.row}>
                {'dices: '}
                {dices.map((dice, index) =>
                    <div
                        className={classNames(classes.dice, {
                            [classes.currDice]: index === currDiceIdx,
                            [classes.usedDice]: index < currDiceIdx,
                            [classes.disabledDice]: (index >= currDiceIdx) && !possibleMoves.find(possibleMove => possibleMove.diceIdx === index)
                        })}
                        key={index}
                    >
                        {dice}
                    </div>
                )}
            </div>
            <div className={classes.circlesEaten}>
                <div className={classes.circlesEatenTitle}>
                    circles eaten
                </div>
                {[Player.PLAYER1, Player.PLAYER2].map(circlesPlayer => (
                    <div className={classes.row} key={circlesPlayer}>
                        {circlesPlayer}
                        <GameCircle
                            className={classNames(
                                classes.circle, {
                                [classes.player1Circle]: circlesPlayer == Player.PLAYER1,
                                [classes.player2Circle]: circlesPlayer == Player.PLAYER2,
                            }
                            )}
                        />
                        {': '}
                        {circlesEaten[circlesPlayer]}
                    </div>
                ))}
            </div>
            {utilButtons.map(({ title, enabled, onClick }) => (
                <button
                    className={classNames({ [classes.clickable]: enabled })}
                    disabled={!enabled}
                    onClick={onClick}
                    onKeyDown={event => event.preventDefault()}
                    key={title}
                >
                    {title}
                </button>
            ))
            }
            {gameEnded &&
                <div>Game Ended!</div>
            }
        </div>
    )
}
