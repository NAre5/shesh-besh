import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Column } from '../models/Column';
import { useStyles } from './GameStyles';
import { useGame } from './useGame';
import Circle from '@material-ui/icons/FiberManualRecord';
import { Player } from '../models/enums/Player';

const Game = () => {
  const classes = useStyles();

  const { columns, turnPlayer, dices,
    turnPlayerNeedToReturn, onCircleClick, onColumnClick, switchDices } = useGame();

  const GameColumn: React.FC<
    { column: Column; index: number; onClick?: (index: number) => void; className?: string }
  > = ({
    column, index, onClick, className
  }) => (
      <div
        // key={index}
        onClick={() => onClick && onClick(index)}
        className={classNames(classes.column, className, {
          [classes.topColumn]: index < columns.length / 2,
          [classes.bottomColumn]: index >= columns.length / 2,
          [classes.type1Column]: index % 2 !== 0,
          [classes.type2Column]: index % 2 === 0,
        })}
      >
        {/* {index} */}
        {Array.from({ length: column.circles[Player.PLAYER1] }).map((_, circleIndex) => (
          <Circle
            key={circleIndex}
            className={classNames(
              classes.circle, classes.player1Circle,
              { [classes.clickable]: !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1 }
            )}
            onClick={() => turnPlayer === Player.PLAYER1 && onCircleClick(index)}
          />
        ))}
        {Array.from({ length: column.circles[Player.PLAYER2] }).map((_, circleIndex) => (
          <Circle
            key={circleIndex}
            className={classNames(
              classes.circle, classes.player2Circle,
              { [classes.clickable]: !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2 }
            )}
            onClick={() => turnPlayer === Player.PLAYER2 && onCircleClick(index)}
          />
        ))}
      </div>
    );

  return (
    <div className={classes.app}>
      {dices[0] + ' ' + dices[1]}
      <button onClick={switchDices}>switch</button>
      <div className={classes.game}>
        <div className={classes.topColumns}>
          {columns
            .slice(0, columns.length / 4)
            .map((column, index) => (
              <GameColumn
                column={column}
                index={index}
                key={index}
                onClick={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1) ? onColumnClick : undefined}
                className={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1) ? classes.clickable : undefined}
              />
            ))}
          <div className={classes.divider} />
          {columns
            .slice(columns.length / 4, columns.length / 2)
            .map((column, index) => (
              <GameColumn
                column={column}
                index={columns.length / 4 + index}
                key={columns.length / 4 + index}
              />
            ))}
        </div>
        <div className={classes.bottomColumns}>
          {columns
            .slice(columns.length / 2, columns.length / (4 / 3))
            .map((column, index) => (
              <GameColumn
                column={column}
                index={columns.length / 2 + index}
                key={columns.length / 2 + index}
              />
            ))}
          <div className={classes.divider} />
          {columns
            .slice(columns.length / (4 / 3))
            .map((column, index) => (
              <GameColumn
                column={column}
                index={columns.length / (4 / 3) + index}
                key={columns.length / (4 / 3) + index}
                onClick={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2) ? onColumnClick : undefined}
                className={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2) ? classes.clickable : undefined}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
