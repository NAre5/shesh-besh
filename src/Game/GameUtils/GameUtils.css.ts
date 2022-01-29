import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    '& *': {
      fontWeight: 600,
    },
    width: 120,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid black',
    margin: '5px 0',
    padding: '2px'
  },
  dice: {
    backgroundColor: 'white',
    margin: 2,
    height: 20,
    width: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px'
  },
  usedDice: {
    backgroundColor: 'gray',
  },
  clickable: {
    cursor: 'pointer'
  },
  disabled: {
    cursor: 'not-allowed'
  },
  circlesEaten: {
    marginTop: 10
  },
  circlesEatenTitle: {
    textDecoration: 'underline'
    // border: '2px solid black'
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
