import {fade, makeStyles} from "@material-ui/core/styles";

const useNavBarStyles = makeStyles(theme => ({
    growQuarter: {
        flexGrow: 0.25,
    },
    growHalf: {
        flexGrow: 0.5,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBarRoot: {
        boxShadow: "none !important",
        height: 80,
    },
    toolBarRoot: {
        minHeight: 80,
    },
    title: {
        flexGrow: 1,
        display: "none",
        fontSize: "2.3rem",
        color: "black",
        fontWeight: 700,
        [theme.breakpoints.up("sm")]: {
            display: "block",
            paddingBottom: 5,
        },
        [theme.breakpoints.down("sm")]: {
            display: "block",
            fontSize: "1.8rem",
            paddingBottom: 0,
        },
    },
    autoCompleteSearchBarRoot: {
        [theme.breakpoints.down("xs")]: {
            height: 80,
            paddingTop: "0.5rem",
            left: 0,
            backgroundColor: "#fff",
            overflow: 'visible',
            position: 'absolute',
            alignSelf: 'center',
            zIndex: '1001',
        },
    },
    searchContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    arrowIcon: {
        overflow: 'visible',
        position: "absolute",
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        height: 40,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.black, 0.1),
        },
        [theme.breakpoints.down("sm")]: {
            width: '0ch',
            float: 'right',
            '&:focus': {
                width: '20ch',
            },
        },
        [theme.breakpoints.up("sm")]: {
            width: '50ch',
        },
        [theme.breakpoints.up("md")]: {
            width: '80ch',
        },
        [theme.breakpoints.up("lg")]: {
            width: '60ch',
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 1),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: fade(theme.palette.common.black, 0.3),
        [theme.breakpoints.down("xs")]: {
            color: 'black',
        }

    },
    inputRoot: {
        color: "inherit",
        [theme.breakpoints.down("xs")]: {
            float: 'right'
        }
    },
    inputInput: {
        padding: '12px',
        fontSize: '1rem',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.down("sm")]: {
            width: '0ch',
            '&:focus': {
                width: '40ch',
                backgroundColor: fade(theme.palette.common.white, 0.9),
            },
        },
        [theme.breakpoints.up("sm")]: {
            width: '50ch',
        },
        [theme.breakpoints.up("md")]: {
            width: '80ch',
        },
        [theme.breakpoints.up("lg")]: {
            width: '60ch',
        }
    },
    iconButtonLabel: {
        display: 'inline-block !important',
        transform: 'translateY(-50%) !important',
        verticalAlign: 'middle !important',
        textAlign: 'center !important'
    },
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    },
    sectionMobile: {
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        }
    },
    iconButtonRoot: {
        padding: "2px 10px 2px 10px"
    },
    mobileSearchContainer: {
        display: "flex",
        alignItems: "center"
    },
    mobileSearchButton: {
        alignSelf: "flex-end"
    },
}));

export default useNavBarStyles;