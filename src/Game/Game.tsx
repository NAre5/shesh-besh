import React, { useState } from 'react';

import { useGame } from './useGame';
import { Move } from '../models/Move';
import { useStyles } from './Game.css';
import { columnsSplit } from '../utils/utils';
import { Player } from '../models/enums/Player';
import { GameUtils } from './GameUtils/GameUtils';
import { GameColumn, Props as GameColumnProps } from './GameColumn/GameColumn';

const Game = () => {
    const classes = useStyles();
    const [hintedMove, setHintedMove] = useState<Move | undefined>(undefined);

    const { columns, turnPlayer, dices, circlesEaten, moves, getMoveParams,
        turnPlayerNeedToReturn, onCircleClick, onColumnClick } = useGame();

    const sharedGameColumnProps: Omit<GameColumnProps, 'index' | 'column' | 'onClick' | '_classNames'> = {
        turnPlayerNeedToReturn,
        turnPlayer,
        onCircleClick,
        getMoveParams,
        hintedMove,
        setHintedMove
    };

    // console.log(123);


    return (
        <div className={classes.app}>
            <GameUtils
                {...{
                    turnPlayer,
                    dices,
                    circlesEaten,
                    moves
                }}
            />
            <div className={classes.game}>
                <div className={classes.player2Columns}>
                    {columns
                        .slice(columnsSplit[Player.PLAYER2].homeEnd, columnsSplit[Player.PLAYER2].homeStart + 1)
                        .map((column, index) => (
                            <GameColumn
                                {...{ column }}
                                index={index + columnsSplit[Player.PLAYER2].homeEnd}
                                key={index + columnsSplit[Player.PLAYER2].homeEnd}
                                onClick={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1) ? onColumnClick : undefined}
                                _classNames={[classes.player2Column, {
                                    [classes.clickable]: turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1
                                }]}
                                {...sharedGameColumnProps}
                            />
                        ))}
                    <div className={classes.divider} />
                    {columns
                        .slice(columnsSplit[Player.PLAYER2].outerEnd, columnsSplit[Player.PLAYER2].outerStart + 1)
                        .map((column, index) => (
                            <GameColumn
                                {...{ column }}
                                index={index + columnsSplit[Player.PLAYER2].outerEnd}
                                key={index + columnsSplit[Player.PLAYER2].outerEnd}
                                _classNames={[classes.player2Column]}
                                {...sharedGameColumnProps}
                            />
                        ))}
                </div>
                <div className={classes.player1Columns}>
                    {columns
                        .slice(columnsSplit[Player.PLAYER1].outerStart, columnsSplit[Player.PLAYER1].outerEnd + 1)
                        .map((column, index) => (
                            <GameColumn
                                {...{ column }}
                                index={index + columnsSplit[Player.PLAYER1].outerStart}
                                key={index + columnsSplit[Player.PLAYER1].outerStart}
                                _classNames={[classes.player1Column]}
                                {...sharedGameColumnProps}
                            />
                        ))}
                    <div className={classes.divider} />
                    {columns
                        .slice(columnsSplit[Player.PLAYER1].homeStart, columnsSplit[Player.PLAYER1].homeEnd + 1)
                        .map((column, index) => (
                            <GameColumn
                                {...{ column }}
                                index={index + columnsSplit[Player.PLAYER1].homeStart}
                                key={index + columnsSplit[Player.PLAYER1].homeStart}
                                onClick={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2) ? onColumnClick : undefined}
                                _classNames={[classes.player1Column, {
                                    [classes.clickable]: turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2
                                }]}
                                {...sharedGameColumnProps}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Game;
