import { makeStyles } from '@material-ui/core';

// @ts-ignore
const useStyles = makeStyles((theme: any) => {
    return {
        bannerContainer: {
            position: "absolute",
            width: "80%",
            opacity: 1,
            transition: "opacity 1s",
            maxWidth: "1000px",
            zIndex: 999,
            left: "50%",
            transform: "translateX(-50%)",
            "& img" : {
                width: "100%",
            },
            color: "white",
            "& hide": {
                opacity: 0
            }
        },
        content: {
            position: "absolute",
            display: "flex",
            width: "100%",
            top: "50%",
            transform: "translateY(-50%)",
        },
        left: {
            width: "50%",
            display: "block",
            "& h3": {
                color: "#08DEFC",
                fontSize: 13
            },
            "& h2": {
                color: "white",
                fontSize: 22
            }
        },
        right: {
            width: "50%",
            display: "contents"
        },
        btn : {
            height: '42px',
            width: 200,
            fontFamily: 'DM Sans',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '18px',
            color: '#FFFFFF',
            border: 'none',
            outline: 'none',
            padding: '0 27px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '60px',
            backgroundColor: '#08DEFC',
            cursor: 'pointer',
            margin:"auto"
        },
        closeBtn: {
            fontSize: 24,
            position: "absolute",
            top: 10,
            right: 20,
            cursor: "pointer",
            fontWeight: "bold"
        }
    }
})

export default useStyles;