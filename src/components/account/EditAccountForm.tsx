import { styled, useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
// @mui
import { Alert, Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, unstable_createMuiStrictModeTheme } from '@mui/material';
import { Form, Formik, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataQuery } from 'src/db/apis/DataQuery';
import { ImageFactory } from 'src/db/apis/ImageFactory';
import { ProfileInteraction } from 'src/db/apis/ProfileInteraction';
import { UserEntity } from 'src/db/entities/users/UserEntity';
// hooks
import useAuth from 'src/hooks/useAuth';
import { PAGE_PATHS } from 'src/routing/paths';
//utils
import isValidUsername from 'src/utils/isValidUsername';
import * as Yup from 'yup';
// components
import TransitionAlert from '../auth/TransitionAlert';
import CustomAvatar from '../experimental/CustomAvatar';
import { AuthContext } from 'src/contexts/AuthContext';
//db

// ----------------------------------------------------------------------

type InitialValues = {
  username: string;
  bio: string;
};

export default function ModifyAccountForm(  ) {
    let navigate = useNavigate();
    const { authedUser, logout } = useAuth();
    const [frequency, setFrequency] = useState(authedUser ? authedUser.nonauth.settings.emailFrequency : 0);
    const [deleteMessage, setDeleteMessage] = useState(false);
    /* Ensure that the email frequency is valid */
    const validFrequencies = [0, 1, 7];
    if(validFrequencies.indexOf(frequency.valueOf()) == -1) setFrequency(0);

    async function logOut() {
        if (!authedUser) return;
        logout();
        navigate(PAGE_PATHS.dashboard.home);
    }

    async function deleteAccount() {
        if (!authedUser) return;
        await ProfileInteraction.deleteAccount(authedUser.nonauth.id);
        logOut();
    }

    return (
        <Stack spacing={3}> 
            {/* <FormControl fullWidth>
                <InputLabel id="email-frequency-select-label">이메일 빈도</InputLabel>
                <Select labelId="email-frequency-select-label"
                    value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}>
                    <MenuItem value={0}>이메일 안함</MenuItem>
                    <MenuItem value={1}>일주일에 한번</MenuItem>
                    <MenuItem value={7}>매일</MenuItem>
                </Select>
            </FormControl> */}
            <Dialog
                open={deleteMessage}
                onClose={() => setDeleteMessage(false)}
            >
                <DialogTitle id="confirm-dialog">계정 삭제?</DialogTitle>
                <DialogContent>이 선택은 다시 되돌릴 수 없읍니다.</DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={() => setDeleteMessage(false)}
                    >
                    아니요, 삭제 하지 마세요.
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setDeleteMessage(false);
                            deleteAccount();
                        }}
                        >
                    예, 그레도 삭제 해주새요.
                    </Button>
                </DialogActions>
            </Dialog>

            <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={logOut}
            >
                로그아오트
            </Button>
            <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={() => setDeleteMessage(true)}
            >
                계정 삭제
            </Button>
        </Stack>
    );
}
