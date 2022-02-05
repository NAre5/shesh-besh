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
    borderRadius: '5px',
    border: 'solid 2px white'
  },
  currDice: {
    border: 'solid 2px black'
  },
  usedDice: {
    backgroundColor: 'gray',
    border: 'solid 2px gray'
  },
  disabledDice: {
    background: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M100 0 L0 100 ' stroke='black' stroke-width='1'/><path d='M0 0 L100 100 ' stroke='black' stroke-width='1'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: '100% 100%, auto',
  },
  clickable: {
    cursor: 'pointer'
  },
  disabled: {
    cursor: 'not-allowed'
  },
  circlesEaten: {
    margin: '10px 0'
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
