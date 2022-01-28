import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 10
  },
  circleCount: {
    display: 'flex',
    alignItems: 'center'
  },
  circle: {
    width: '10px',
    height: '10px',
    // border: 'solid 1px gray',
    borderRadius: '50%',
    margin: 'min(0.5vh, 0.5vw)'
    // display: 'inline-block',
  },
  player1Circle: {
    // fill: 'blue',
    backgroundColor: 'blue',
  },
  player2Circle: {
    // fill: 'red',
    backgroundColor: 'red',
  },
});
