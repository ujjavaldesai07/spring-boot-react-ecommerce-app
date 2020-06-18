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
        minWidth: 50,
        width: "auto",
    },
    tabFlexContainer: {
        width: "30% !important",
    }
}));

export default useTabStyles;