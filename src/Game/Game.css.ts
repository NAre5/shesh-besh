import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  app: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'cadetblue'
  },
  gameUtils: {
    display: 'flex',
    flexDirection: 'column',
  },
  game: {
    height: '100%',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#dbc18b',
  },
  divider: {
    width: '3%'
  },
  player2Columns: {
    height: '50%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  player1Columns: {
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
    // @ts-ignore
    flexDirection: 'column-reverse!important',
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
});

// @keyframes App-logo-spin {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }
