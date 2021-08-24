import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Circle from '@material-ui/icons/FiberManualRecord';

import { Column } from 'models/Column';

import { useApp } from './useApp';
import { useStyles } from './AppStyles';



const App = () => {
  const classes = useStyles();

  const { columns } = useApp();

  const GameColumn: React.FC<{ column: Column; index: number }> = ({
    column,
    index,
  }) => (
    <div
      key={index}
      className={classNames(classes.column, {
        [classes.topColumn]: index < columns.length / 2,
        [classes.bottomColumn]: index >= columns.length / 2,
        [classes.type1Column]: index % 2 !== 0,
        [classes.type2Column]: index % 2 === 0,
      })}
    >
      {/* {index} */}
      {Array.from({ length: column.player1_circles }).map((_, circleIndex) => (
        <Circle
          key={circleIndex}
          className={classNames(classes.circle, classes.player1Circle)}
        />
      ))}
      {Array.from({ length: column.player2_circles }).map((_, circleIndex) => (
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
              <GameColumn column={column} index={index} />
            ))}
          <div className={classes.divider} />
          {columns
            .slice(columns.length / 4, columns.length / 2)
            .map((column, index) => (
              <GameColumn column={column} index={columns.length / 4 + index} />
            ))}
        </div>
        <div className={classes.bottomColumns}>
          {columns
            .slice(columns.length / 2, columns.length / (4 / 3))
            .map((column, index) => (
              <GameColumn column={column} index={columns.length / 2 + index} />
            ))}
          <div className={classes.divider} />
          {columns
            .slice(columns.length / (4 / 3))
            .map((column, index) => (
              <GameColumn column={column} index={columns.length / (4 / 3) + index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
