import classNames, { Argument } from 'classnames';
import React, { useMemo } from 'react';
import { Column } from '../models/Column';
import { useStyles } from './GameStyles';
import { useGame } from './useGame';
import Circle from '@material-ui/icons/FiberManualRecord';
import { Player } from '../models/enums/Player';
import { columnsSplit } from '../utils/utils';

const Game = () => {
  const classes = useStyles();

  const { columns, turnPlayer, dices, circlesEaten,
    turnPlayerNeedToReturn, onCircleClick, onColumnClick, switchDices } = useGame();

  const GameColumn: React.FC<
    { column: Column; index: number; onClick?: (index: number) => void; _classNames?: Argument[] }
  > = ({
    column, index, onClick, _classNames
  }) => (
      <div
        // key={index}
        onClick={() => onClick && onClick(index)}
        className={classNames(classes.column, _classNames, {
          [classes.type1Column]: index % 2 === 0,
          [classes.type2Column]: index % 2 !== 0,
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
            onClick={() => !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1 && onCircleClick(index)}
          />
        ))}
        {Array.from({ length: column.circles[Player.PLAYER2] }).map((_, circleIndex) => (
          <Circle
            key={circleIndex}
            className={classNames(
              classes.circle, classes.player2Circle,
              { [classes.clickable]: !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2 }
            )}
            onClick={() => !turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2 && onCircleClick(index)}
          />
        ))}
      </div>
    );

  return (
    <div className={classes.app}>
      <div className={classes.gameUtils}>
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
                classes.player1Circle,
              )}
            />
          </div>
          <div>
            {circlesEaten[Player.PLAYER2]}
            <Circle
              className={classNames(
                classes.player2Circle,
              )}
            />
          </div>

        </div>
      </div>
      <div className={classes.game}>
        <div className={classes.player2Columns}>
          {columns
            .slice(columnsSplit[Player.PLAYER2].homeEnd, columnsSplit[Player.PLAYER2].homeStart + 1)
            .map((column, index) => (
              <GameColumn
                column={column}
                index={index + columnsSplit[Player.PLAYER2].homeEnd}
                key={index + columnsSplit[Player.PLAYER2].homeEnd}
                onClick={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1) ? onColumnClick : undefined}
                _classNames={[classes.player2Column, turnPlayerNeedToReturn && turnPlayer === Player.PLAYER1 && classes.clickable]}
              />
            ))}
          <div className={classes.divider} />
          {columns
            .slice(columnsSplit[Player.PLAYER2].outerEnd, columnsSplit[Player.PLAYER2].outerStart + 1)
            .map((column, index) => (
              <GameColumn
                column={column}
                index={index + columnsSplit[Player.PLAYER2].outerEnd}
                key={index + columnsSplit[Player.PLAYER2].outerEnd}
                _classNames={[classes.player2Column]}
              />
            ))}
        </div>
        <div className={classes.player1Columns}>
          {columns
            .slice(columnsSplit[Player.PLAYER1].outerStart, columnsSplit[Player.PLAYER1].outerEnd + 1)
            .map((column, index) => (
              <GameColumn
                column={column}
                index={index + columnsSplit[Player.PLAYER1].outerStart}
                key={index + columnsSplit[Player.PLAYER1].outerStart}
                _classNames={[classes.player1Column]}
              />
            ))}
          <div className={classes.divider} />
          {columns
            .slice(columnsSplit[Player.PLAYER1].homeStart, columnsSplit[Player.PLAYER1].homeEnd + 1)
            .map((column, index) => (
              <GameColumn
                column={column}
                index={index + columnsSplit[Player.PLAYER1].homeStart}
                key={index + columnsSplit[Player.PLAYER1].homeStart}
                onClick={(turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2) ? onColumnClick : undefined}
                _classNames={[classes.player1Column, turnPlayerNeedToReturn && turnPlayer === Player.PLAYER2 && classes.clickable]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
