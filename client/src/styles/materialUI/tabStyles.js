import {makeStyles} from "@material-ui/core/styles";

const useTabStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperRoot: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0),
            width: theme.spacing(72),
            height: theme.spacing(50),
        },
        opacity: 5,
        position: "fixed",
        zIndex: 1001,
        height: '400px',
        left: '170px',
    },
    listItemTextRoot: {
        '&:hover': {
            fontWeight: 500
        },
        color: "black",
    },
    tabRoot: {
        width: "auto",
        height: 80,
        flexGrow: 1,
        [theme.breakpoints.up('lg')]: {
            minWidth: 50,
        },
    },
    tabsWrapper: {
        fontWeight: "600",
        color: "black",
        [theme.breakpoints.up('md')]: {
            fontSize: "1rem",
        }
    },
    tabsFlexContainer: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            width: "35%",
        }
    }
}));

export default useTabStyles;