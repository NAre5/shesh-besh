import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  column: {
    border: 'solid black',
    height: '94%',
    width: 'calc(100%/13)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  clickable: {
    cursor: 'pointer',
  },
  type1Column: {
    backgroundColor: 'white',
    // backgroundColor: 'rgba(255,255,255,0.85)',
  },
  type2Column: {
    backgroundColor: 'black',
    // backgroundColor: 'rgba(0,0,0,0.85)',
  },
  circle: {
    width: 'min(7vh, 7vw)',
    height: 'min(7vh, 7vw)',
    // border: 'solid 1px gray',
    // transition: 'all 5s linear'
    // backgroundColor: '#bbb',
    borderRadius: '50%',
    margin: '3%'
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
