import {makeStyles} from "@material-ui/core/styles";

const useTabStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperRoot: {
        '& > *': {
            width: theme.spacing(45),
            height: theme.spacing(45),
        },
        position: "fixed",
        zIndex: 1201
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
}));

export default useTabStyles;