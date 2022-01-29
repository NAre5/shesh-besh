import { makeStyles } from '@material-ui/core';

const HINTED_CIRCLE_OPACITY = 0.5;

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
  // player2Column: {
  //   borderBottomRightRadius: '50%',
  //   borderBottomLeftRadius: '50%',
  // },
  // player1Column: {
  //   // @ts-ignore
  //   flexDirection: 'column-reverse!important',
  //   borderTopRightRadius: '50%',
  //   borderTopLeftRadius: '50%',
  // },
  player2Column: {
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  player1Column: {
    // @ts-ignore
    flexDirection: 'column-reverse!important',
    borderTopRightRadius: '50%',
    borderTopLeftRadius: '50%',
  },
  clickable: {
    cursor: 'pointer',
  },
  disabled: {
    cursor: 'not-allowed',
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
  player1HintedCircle: {
    // backgroundColor: 'blue',
    backgroundColor: `rgba(0, 0, 255, ${HINTED_CIRCLE_OPACITY})`,
  },
  player2HintedCircle: {
    // fill: 'red',
    backgroundColor: `rgba(255, 0, 0, ${HINTED_CIRCLE_OPACITY})`,
  },
});
