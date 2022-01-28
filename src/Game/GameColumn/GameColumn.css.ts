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
    '&:hover': {
      cursor: 'pointer',
    },
  },
  player2Column: {
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  player1Column: {
    flexDirection: 'column-reverse',
    borderTopRightRadius: '50%',
    borderTopLeftRadius: '50%',
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
    width: '70%',
    height: 'auto',
    // border: 'solid 1px gray',
    transition: 'all 5s linear'
    // backgroundColor: '#bbb',
    // borderRadius: '50%',
    // display: 'inline-block',
  },
  player1Circle: {
    fill: 'blue',
    // fill: 'white',
  },
  player2Circle: {
    fill: 'red',
    // fill: 'black',
  },
  // divider: {
  //   width: '1%'
  // },
  // mainDivider: {
  // },
});
