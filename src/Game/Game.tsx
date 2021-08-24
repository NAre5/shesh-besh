import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Column } from '../models/Column';
import { useStyles } from './GameStyles';
import { useGame } from './useGame';
import Circle from '@material-ui/icons/FiberManualRecord';
import { Player } from '../models/enums/Player';

const Game = () => {
  const classes = useStyles();

  const { columns } = useGame();

  const GameColumn: React.FC<{ column: Column; index: number }> = ({
    column,
    index,
  }) => (
    <div
      // key={index}
      className={classNames(classes.column, {
        [classes.topColumn]: index < columns.length / 2,
        [classes.bottomColumn]: index >= columns.length / 2,
        [classes.type1Column]: index % 2 !== 0,
        [classes.type2Column]: index % 2 === 0,
      })}
    >
      {/* {index} */}
      {Array.from({ length: column.playersCircles[Player.PLAYER1] }).map((_, circleIndex) => (
        <Circle
          key={circleIndex}
          className={classNames(classes.circle, classes.player1Circle)}
        />
      ))}
      {Array.from({ length: column.playersCircles[Player.PLAYER2] }).map((_, circleIndex) => (
        <Circle
          key={circleIndex}
          className={classNames(classes.circle, classes.player2Circle)}
        />
      ))}
    </div>
  );

  return (
    <div className={classes.app}>
      <div className={classes.game}>
        <div className={classes.topColumns}>
          {columns
            .slice(0, columns.length / 4)
            .map((column, index) => (
              <GameColumn
                column={column}
                index={index}
                key={index}
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
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
