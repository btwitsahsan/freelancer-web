import React from 'react';
import { Box, Button, Typography, Modal, TextField, Select, MenuItem } from '@mui/material';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

interface Talent {
    name: string;
    role: string;
}

interface InviteModalProps {
    open: boolean;
    onClose: () => void;
    talent: Talent;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: "20px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    gap: 1
};

const InviteModal: React.FC<InviteModalProps> = ({ open, onClose, talent }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="invite-modal-title"
            aria-describedby="invite-modal-description"
        >
            <Box sx={style}>
                <Box display="flex" justifyContent="space-between" gap={2}>
                    <Typography variant="h2" fontSize={24} fontWeight={600}>Invite to job</Typography>
                    <Button variant="text" className='text-gray500' onClick={onClose} sx={{
                        padding: 0,
                        minWidth: "auto",
                        width: "28px",
                        height: "28px"
                    }}><IoClose className='w-5 h-5 text-green500' /></Button>
                </Box>
                <Box display="flex" alignItems="center" gap={1.5}>
                    <Image src="/image/avatar/1.jpg" alt="User Avatar" width={40} height={40} className="w-10 h-10 rounded-full" />
                    <Box>
                        <Typography variant="h6" fontSize={14} className='text-green500 underline'>{talent.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{talent.role}</Typography>
                    </Box>
                </Box>

                <Box>
                    <Typography variant="subtitle1">
                        Message
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        sx={{
                            ".MuiInputBase-root": {
                                borderRadius: 2,
                                padding: "8px 16px"
                            },
                            ".Mui-focused fieldset": {
                                borderColor: "var(--green-500) !important"
                            }
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="subtitle1">
                        Choose a Job
                    </Typography>
                    <Select
                        fullWidth
                        defaultValue=""
                        displayEmpty
                        sx={{
                            borderRadius: 2,
                            ".MuiSelect-select": {
                                padding: "12px 16px"
                            },
                            ".Mui-focused fieldset": {
                                borderColor: "var(--green-500) !important"
                            }
                        }}
                    >
                        <MenuItem value="" disabled>Select Job</MenuItem>
                        <MenuItem value={1}>Job 1</MenuItem>
                        <MenuItem value={2}>Job 2</MenuItem>
                        <MenuItem value={3}>Job 3</MenuItem>
                    </Select>
                </Box>

                <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                    <Typography variant="caption" color="textSecondary">You have <span className='text-green500'>27 invites left</span></Typography>
                    <Button variant="contained" sx={{ bgcolor: 'var(--green-500)', borderRadius: "8px" }} onClick={onClose}>
                        Send Invitation
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InviteModal;
