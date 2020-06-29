import {makeStyles} from "@material-ui/core/styles";

const useTabStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0),
            width: theme.spacing(80),
            height: theme.spacing(140),
        },
        position: "fixed",
        zIndex: 1001,
        height: '200px',
        paddingTop: '20px',
        left: '200px',
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