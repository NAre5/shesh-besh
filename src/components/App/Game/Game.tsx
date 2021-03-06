import React, { useState } from 'react';

import { Move } from 'models/Move';
import { useGame } from './useGame';
import { useStyles } from './Game.css';
import { Column } from 'models/Column';
import { columnsSplit } from 'utils/utils';
import { Player } from 'models/enums/Player';
import { GameUtils } from './GameUtils/GameUtils';
import GameColumn, { Props as GameColumnProps } from './GameColumn/GameColumn';

const Game = () => {
    const classes = useStyles();
    const [hintedMove, setHintedMove] = useState<Move | undefined>(undefined);

    const { columns, turnPlayer, dices, circlesEaten, moves, possibleMoves, canResurrectCircleToColumns, canResurrectCircleToPlayerColumn,
        turnPlayerNeedToReturn, onCircleClick, resurrectCircleToColumn, currDiceIdx, gameEnded } = useGame();

    const sharedGameColumnProps: Omit<GameColumnProps, 'index' | 'column' | 'canResurrectCircle'> = {
        turnPlayerNeedToReturn,
        turnPlayer,
        onCircleClick,
        hintedMove,
        setHintedMove,
        possibleMoves,
        resurrectCircleToColumn,
        currDiceIdx,
        // circlesEaten
    };

    return (
        <div className={classes.app}>
            <GameUtils
                {...{
                    turnPlayer,
                    dices,
                    circlesEaten,
                    moves,
                    gameEnded,
                    possibleMoves,
                    currDiceIdx
                }}
            />
            <div className={classes.game}>
                <div className={classes.player2Columns}>
                    {columns
                        .slice(columnsSplit[Player.PLAYER2].homeEnd, columnsSplit[Player.PLAYER2].homeStart + 1)
                        .map((column: Column, index: number) => {
                            const key = index + columnsSplit[Player.PLAYER2].homeEnd;
                            return <GameColumn
                                {...{ column }}
                                index={key}
                                key={key}
                                // playerSide={Player.PLAYER2}
                                // isHome={true}
                                // canResurrectCircle={turnPlayer === Player.PLAYER1 && canResurrectCircleToColumns?.includes(key)}
                                canResurrectCircle={canResurrectCircleToPlayerColumn(Player.PLAYER1, key)}
                                _classNames={[classes.player2Column, {
                                    [classes.clickable]: turnPlayer === Player.PLAYER1 && canResurrectCircleToColumns?.includes(key),
                                    [classes.disabled]: turnPlayer === Player.PLAYER1 && !(canResurrectCircleToColumns?.includes(key))
                                }]}
                                {...sharedGameColumnProps}
                            />
                        })}
                    <div className={classes.divider} />
                    {columns
                        .slice(columnsSplit[Player.PLAYER2].outerEnd, columnsSplit[Player.PLAYER2].outerStart + 1)
                        .map((column: any, index: number) => {
                            const key = index + columnsSplit[Player.PLAYER2].outerEnd;
                            return <GameColumn
                                {...{ column }}
                                index={key}
                                key={key}
                                // playerSide={Player.PLAYER2}
                                // isHome={false}
                                _classNames={[classes.player2Column]}
                                {...sharedGameColumnProps}
                            />
                        })}
                </div>
                <div className={classes.player1Columns}>
                    {columns
                        .slice(columnsSplit[Player.PLAYER1].outerStart, columnsSplit[Player.PLAYER1].outerEnd + 1)
                        .map((column: any, index: number) => {
                            const key = index + columnsSplit[Player.PLAYER1].outerStart;
                            return <GameColumn
                                {...{ column }}
                                index={key}
                                key={key}
                                // playerSide={Player.PLAYER1}
                                // isHome={false}
                                _classNames={[classes.player1Column]}
                                {...sharedGameColumnProps}
                            />
                        })}
                    <div className={classes.divider} />
                    {columns
                        .slice(columnsSplit[Player.PLAYER1].homeStart, columnsSplit[Player.PLAYER1].homeEnd + 1)
                        .map((column: any, index: number) => {
                            const key = index + columnsSplit[Player.PLAYER1].homeStart;
                            return <GameColumn
                                {...{ column }}
                                index={key}
                                key={key}
                                // playerSide={Player.PLAYER1}
                                // isHome={true}
                                // canResurrectCircle={turnPlayer === Player.PLAYER2 && canResurrectCircleToColumns?.includes(key)}
                                canResurrectCircle={canResurrectCircleToPlayerColumn(Player.PLAYER2, key)}
                                _classNames={[classes.player1Column, {
                                    [classes.clickable]: turnPlayer === Player.PLAYER2 && canResurrectCircleToColumns?.includes(key),
                                    [classes.disabled]: turnPlayer === Player.PLAYER2 && !(canResurrectCircleToColumns?.includes(key))
                                }]}
                                {...sharedGameColumnProps}
                            />
                        })}
                </div>
            </div>
        </div>
    );
};

export default Game;
