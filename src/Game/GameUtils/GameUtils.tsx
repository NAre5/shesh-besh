import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Move } from '../../models/Move';
import { useStyles } from './GameUtils.css';
import { Dices } from '../../models/GameTurn';
import { AppDispatch } from '../../redux/store';
import { Player } from '../../models/enums/Player';
import { switchDices } from '../../redux/Game.slice';
import GameCircle from '../GameCircle/GameCircle';
import { MapPlayerTo } from '../../models/MapPlayerTo';

interface Props {
    turnPlayer: Player;
    dices: Dices;
    circlesEaten: MapPlayerTo<number>;
    moves: Move[];
}

export const GameUtils: React.FC<Props> = (props) => {
    const { turnPlayer, dices, circlesEaten, moves } = props;
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const allowSwitchDices = useMemo<boolean>(() => (
        dices[0] === dices[1]
        || moves.length === 0
        // && im the player
    ), [dices, moves])

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
                            [classes.usedDice]: moves.length >= (1 + index) * (dices[0] === dices[1] ? 2 : 1)
                        })}
                        key={index}
                    >
                        {dice}
                    </div>
                )}
            </div>
            <button
                className={classNames({
                    [classes.clickable]: allowSwitchDices,
                    // [classes.disabled]: ,
                })}
                disabled={!allowSwitchDices}
                onClick={() => dispatch(switchDices())}
            >
                switch
            </button>
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
        </div>
    )
}
