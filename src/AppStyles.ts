import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  app: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    // flexWrap: 'wrap',
  },
  game: {
    height: '100%',
    width: '80%',
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'column',
    backgroundColor: '#dbc18b',
  },
  divider: {
    width: '3%'
  },
  topColumns: {
    height: '50%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  bottomColumns: {
    height: '50%',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  column: {
    border: 'solid black',
    height: '94%',
    width: 'calc(100%/13)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  topColumn: {
    borderBottomRightRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  bottomColumn: {
    flexDirection: 'column-reverse',
    borderTopRightRadius: '50%',
    borderTopLeftRadius: '50%',
  },
  type1Column: {
    backgroundColor: 'white',
  },
  type2Column: {
    backgroundColor: 'black',
  },
  circle: {
    width: '70%',
    height: 'auto',
    border: 'solid 1px gray',
    '&:hover': {
      cursor: 'pointer',
    },
    // backgroundColor: '#bbb',
    // borderRadius: '50%',
    // display: 'inline-block',
  },
  player1Circle: {
    fill: 'white',
  },
  player2Circle: {
    fill: 'black',
  },
  // divider: {
  //   width: '1%'
  // },
  // mainDivider: {
  // },
});

// @keyframes App-logo-spin {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }