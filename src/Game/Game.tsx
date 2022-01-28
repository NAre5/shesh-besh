import React, { useMemo } from 'react';
import classNames, { Argument } from 'classnames';
import Circle from '@material-ui/icons/FiberManualRecord';

import { useGame } from './useGame';
import { useStyles } from './GameStyles';
import { Column } from '../models/Column';
import { columnsSplit } from '../utils/utils';
import { Player } from '../models/enums/Player';
import { GameUtils } from './GameUtils/GameUtils';
import { GameColumn } from './GameColumn/GameColumn';

const Game = () => {
    const classes = useStyles();

    const { columns, turnPlayer, dices, circlesEaten,
        turnPlayerNeedToReturn, onCircleClick, onColumnClick, switchDices } = useGame();

    return (
        <div className={classes.app}>
            <GameUtils
                {...{
                    turnPlayer,
                    dices,
                    switchDices,
                    circlesEaten
                }}
            />
            <div className={classes.game}>
                <div className={classes.player2Columns}>
                    {columns
                        .slice(columnsSplit[Player.PLAYER2].homeEnd, columnsSplit[Player.PLAYER2].homeStart + 1)
                        .map((column, index) => (
                            <GameColumn
                                {...{
                                    column,
                                    turnPlayerNeedToReturn,
                                    turnPlayer,
                                    onCircleClick
                                }}
                                index={index + columnsSplit[Player.PLAYER2].homeEnd}
                                key={index + columnsSplit[Player.PLAYER2].homeEnd}
                                onClick={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1) ? onColumnClick : undefined}
                                _classNames={[classes.topColumn, classes.player2Column, {
                                    [classes.clickable]: turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1
                                }]}
                            />
                        ))}
                    <div className={classes.divider} />
                    {columns
                        .slice(columnsSplit[Player.PLAYER2].outerEnd, columnsSplit[Player.PLAYER2].outerStart + 1)
                        .map((column, index) => (
                            <GameColumn
                                {...{
                                    column,
                                    turnPlayerNeedToReturn,
                                    turnPlayer,
                                    onCircleClick
                                }}
                                index={index + columnsSplit[Player.PLAYER2].outerEnd}
                                key={index + columnsSplit[Player.PLAYER2].outerEnd}
                                _classNames={[classes.topColumn, classes.player2Column]}
                            />
                        ))}
                </div>
                <div className={classes.player1Columns}>
                    {columns
                        .slice(columnsSplit[Player.PLAYER1].outerStart, columnsSplit[Player.PLAYER1].outerEnd + 1)
                        .map((column, index) => (
                            <GameColumn
                                {...{
                                    column,
                                    turnPlayerNeedToReturn,
                                    turnPlayer,
                                    onCircleClick
                                }}
                                index={index + columnsSplit[Player.PLAYER1].outerStart}
                                key={index + columnsSplit[Player.PLAYER1].outerStart}
                                _classNames={[classes.bottomColumn, classes.player1Column]}
                            />
                        ))}
                    <div className={classes.divider} />
                    {columns
                        .slice(columnsSplit[Player.PLAYER1].homeStart, columnsSplit[Player.PLAYER1].homeEnd + 1)
                        .map((column, index) => (
                            <GameColumn
                                {...{
                                    column,
                                    turnPlayerNeedToReturn,
                                    turnPlayer,
                                    onCircleClick
                                }}
                                index={index + columnsSplit[Player.PLAYER1].homeStart}
                                key={index + columnsSplit[Player.PLAYER1].homeStart}
                                onClick={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2) ? onColumnClick : undefined}
                                _classNames={[classes.bottomColumn, classes.player1Column, {
                                    [classes.clickable]: turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2
                                }]}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Game;
