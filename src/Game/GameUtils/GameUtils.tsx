import React from 'react';
import classNames from 'classnames';
// import Circle from '@material-ui/icons/FiberManualRecord';

import { useStyles } from './GameUtils.css';
import { Dices } from '../../models/GameTurn';
import { Player } from '../../models/enums/Player';
import { MapPlayerTo } from '../../models/MapPlayerTo';
import { useStyles as useGameStlyes } from '../Game.css';
import { switchDices } from '../../redux/Game.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { Move } from '../../models/Move';
import { GameCircle } from '../GameCircle/GameCircle';

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


    return (
        <div className={classes.root}>
            <div>
                {turnPlayer + ' turn'}
            </div>
            <div>
                {'dices: ' + dices[0] + ' ' + dices[1]}
            </div>
            <button onClick={() => (moves.length === 0) && dispatch(switchDices())}>switch</button>
            <div>
                <div>
                    circles eaten:
                </div>
                {[Player.PLAYER1, Player.PLAYER2].map(circlesPlayer => (
                    <div className={classes.circleCount} key={circlesPlayer}>
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
