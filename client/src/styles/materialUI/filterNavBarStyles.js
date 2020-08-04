import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 240;

export const useFilterNavBarStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        top: 80,
        width: drawerWidth,
        height: "calc(100% - 80px)",
        overflow: "none",
        overflowY: "auto",
        display: "block",
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        paddingTop: "85px",
    },
}));