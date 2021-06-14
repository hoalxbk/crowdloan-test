import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    animation: {

    },
    container: {
      position: 'relative',
      '& img': {
        width: '100%',
        height: 'auto',
      },
      '& .main-content h1': {
        textAlign: 'center',
        fontSize: '68px',
        lineHeight: '80px',
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: '12px'
      },
      '& .main-content h2': {
        textAlign: 'center',
        fontSize: '36px',
        lineHeight: '40px',
        color: '#FFFFFF',
        fontWeight: '700',
        marginBottom: '12px',
        maxWidth: 'calc(100% - 30px)',
        margin: 'auto',
      },
      '& .main-content p': {
        textAlign: 'center',
        color: '#FFFFFF'
      },
      '& .buttons': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        '& img': {
          width: '20px',
          height: '10px',
          marginTop: '2px',
        }
      },
      '& .buttons button': {
        height: '42px',
        color: '#FFFFFF',
        border: 'none',
        outline: 'none',
        padding: '0 35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '60px',
        margin: '36px 6px 0 6px',
        cursor: 'pointer',
      },
      '& .buttons a:first-child button': {
        backgroundColor: '#D01F36'
      },
      '& .buttons a:last-child button': {
        backgroundColor: '#3232DC'
      },
      '& > div': {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        width: '100%'
      },
      [theme.breakpoints.down('sm')]: {
        overflow: 'hidden',
        '& img': {
          objectFit: 'cover',
          height: '600px'
        },
        '& .main-content h1': {
          margin: '15px auto'
        },
      },
      [theme.breakpoints.down('xs')]: {
        height: '700px',
        '& > div': {
          top: '40%'
        },
        overflow: 'hidden',
        '& img': {
          objectFit: 'unset',
          height: 'auto',
          with: '100%'
        },
        '& img.bg2': {
          objectFit: 'cover',
          height: '500px',
          with: '100%'
        },
        '& .main-content h1': {
          display: 'block',
          width: '100%',
          margin: '15px auto',
          fontSize: '46px',
          lineHeight: '52px',
        },
        '& p': {
          fontSize: '16px'
        },
        '& .buttons': {
          flexDirection: 'column',
          '& button': {
            width: '280px',
            margin: '15px auto 0',
            padding: '0 15px'
          },
          '& button:first-child': {
            margin: '40px auto 0'
          }
        }
      },
    },
    cardContainer: {
      margin: '80px 0',

      '& h2': {
        color: '#FFFFFF',
        marginBottom: '40px',
        textAlign: 'center'
      },
      '& .main-content': {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        margin: '0 120px',
        gap: '25px',
      },
      [theme.breakpoints.down('sm')]: {
        '& .main-content': {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          margin: '0 40px',
          gap: '25px',
        },
      },
      [theme.breakpoints.only('xs')]: {
        margin: '20px 0',
        '& .main-content': {
          display: 'grid',
          gridTemplateColumns: '1fr',
          margin: '0 20px',
          gap: '25px',
        },
      },
    },
  };
});

export default useStyles;
