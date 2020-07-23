import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Fade} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[6],
        height: "fit-content",
        borderRadius: 4
    },
}));

export default function ModalSection(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        props.closeHandler();
        setOpen(false);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                closeAfterTransition
                disableAutoFocus
                disableEnforceFocus
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 300,
                }}>
                <Fade in={open}>
                    <div className={classes.paper} style={{width: props.modalWidth}}>
                        {props.renderWarningComponent}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
