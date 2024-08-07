import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface LoginDetailModalProps {
    open: boolean;
    handleClose: () => void;
}

const LoginDetailModal: React.FC<LoginDetailModalProps> = ({ open, handleClose }) => {

    if (!open) return null; // Don't render the modal if open is false
    return (
        <React.Fragment>
            <BootstrapDialog
                // onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <h2 className="text-xl font-semibold mb-4 mr-2">Welcome to the Sign In page</h2>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <button id="closeButton" className="text-gray-600 text-2xl font-bold cursor-pointer">×</button>
                </IconButton>
                <DialogContent>
                    <Typography>
                        <p className="mb-2">You have several options for logging in:</p>
                    </Typography>
                    <Typography>
                        <p className="mb-2">You can register and use a unique username and password. The downsides for you are its another password to remember and for Captrii, information we would prefer not to process.</p>
                    </Typography>
                    <Typography>
                        <p className="mb-2">Alternatively, you can sign in using your Microsoft or Google account - a process known as Single Sign On. This is a preferred option because these companies manage your credentials. We only receive your email and a unique identifier, and we do not have access to your password. It should be noted that some organizations restrict access to third party applications like Captrii so if you cannot sign in then chat to your IT administrators.</p>
                    </Typography>
                    <Typography>
                        <p className="mb-2">When you sign in using Microsoft or Google, Captrii communicates with your sign-in provider to verify your identity. If you are set up in Captrii to use these sign-ins, you will gain access to the app.</p>
                    </Typography>
                    <Typography>
                        <p>If you need to change your password, you can do so through your sign-in provider, which keeps you in control of your access. We do not handle password changes, ensuring your security and privacy.</p>
                    </Typography>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
export default LoginDetailModal;