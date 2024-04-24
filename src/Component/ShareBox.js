import React from 'react'
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, InputBase, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import toast from "react-hot-toast";
import copy from 'copy-to-clipboard';

const ShareBox = (props) => {
    const { open, onClose, blogData } = props

    const copyPath = () => {
        copy(`${window.location.origin}/blog/${blogData._id}`);
        toast.success("Link Copied!");
    };
    return (
        <Dialog open={open} fullWidth maxWidth={"sm"} onClose={onClose}>
            <DialogTitle>
                <Grid container alignItems='center' justifyContent='space-between'>
                    <Grid item>
                        <Typography>Share Link</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: "center", marginBottom: 20 }}>
                            <InputBase defaultValue={`${window.location.origin}/blog/${blogData._id}`} readOnly={true} fullWidth />
                            <IconButton onClick={copyPath}>
                                <FileCopyOutlinedIcon
                                    style={{ height: '16px', width: '18px' }}
                                />
                            </IconButton>
                        </Box>
                    </Grid>

                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default ShareBox