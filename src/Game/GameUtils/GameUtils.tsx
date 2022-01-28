import React from 'react';
import classNames from 'classnames';
import Circle from '@material-ui/icons/FiberManualRecord';

import { useStyles } from './GameUtils.css';
import { Dices } from '../../models/GameTurn';
import { Player } from '../../models/enums/Player';
import { MapPlayerTo } from '../../models/MapPlayerTo';
import { useStyles as useGameStlyes } from '../GameStyles';

interface Props {
    turnPlayer: Player;
    dices: Dices;
    switchDices: () => void;
    circlesEaten: MapPlayerTo<number>;
}

export const GameUtils: React.FC<Props> = (props) => {
    const { turnPlayer, dices, switchDices, circlesEaten } = props;
    const classes = useStyles();
    const gameClasses = useGameStlyes();

    return (
        <div className={classes.root}>
            <div>
                {turnPlayer + ' turn'}
            </div>
            <div>
                {'dices: ' + dices[0] + ' ' + dices[1]}
            </div>
            <button onClick={switchDices}>switch</button>
            <div>
                <div>
                    circles eaten:
                </div>
                <div>
                    {circlesEaten[Player.PLAYER1]}
                    <Circle
                        className={classNames(
                            gameClasses.player1Circle,
                        )}
                    />
                </div>
                <div>
                    {circlesEaten[Player.PLAYER2]}
                    <Circle
                        className={classNames(
                            gameClasses.player2Circle,
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
