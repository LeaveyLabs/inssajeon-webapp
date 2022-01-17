import { LoadingButton } from '@mui/lab';
// @mui
import { Avatar, Button, CircularProgress, IconButton, Stack, TextField, unstable_createMuiStrictModeTheme } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
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
//db

// ----------------------------------------------------------------------

type InitialValues = {
  username: string;
  bio: string;
};

export default function ModifyProfileForm(  ) {
  let navigate = useNavigate();
  const { authedUser } = useAuth();
  const [signupError, setSignupError] = useState('');
  const [photo, setPhoto] = useState('');
  /* User is initially loading up the photo */
  const [photoLoading, setPhotoLoading] = useState(true);

  const CreateProfileSchema = Yup.object().shape({
    username: Yup
      .string()
      .min(5, '5글자 이상')
      .required('필수'),
  });

  const initialUsername = authedUser?.nonauth.profile.username;
  const intitalBio = authedUser?.nonauth.profile.bio;

  const formik = useFormik<InitialValues>({
    initialValues: {
        username:  initialUsername ? initialUsername : "",
        bio: intitalBio ? intitalBio : "",
    },
    validationSchema: CreateProfileSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm, setFieldValue, setFieldTouched }) => {
        if (!await isValidUsername(values.username) && values.username !== initialUsername) {
            setSignupError("입력하신 이름은 이미 사용중이에요. 다시 골라주세요");
        }
        else {
            try {
                if (authedUser) {
                    await ProfileInteraction.setBio(authedUser.auth.uid, values.bio);
                    await ProfileInteraction.setUsername(authedUser.auth.uid, values.username); //TODO combine these two firebase calls into one
                    navigate(PAGE_PATHS.dashboard.home);
                }
                else { //this should never be reached because CreateProfileForm is only accessible for authedUsers with 0 upvotes
                    setSignupError("오류가 발생했습니다. 로그인 페이지로 돌아가는 중...")
                    setTimeout(() => { 
                        navigate(PAGE_PATHS.auth.signup);
                    }, 3000)}
                } catch (error: any) {
                    setSignupError(error.message)
                }
            }
            setFieldValue('username', '');
            setFieldTouched('username', false);
            setSubmitting(false);
        }
    })

    useEffect(() => { //resets form when moving away from page
        async function updatePic() {
            if(!authedUser || !authedUser.nonauth.profile.picPath) return;
            try { setPhoto(await ImageFactory.pathToImageURL(
                authedUser.nonauth.profile.picPath)); }
            catch {}
        }
        /* Load photo */
        updatePic();
        setPhotoLoading(false);
        /* Reset form */
        return () => {
            setSignupError('');
            formik.resetForm();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
        <Stack spacing={3}> 
            {signupError.length>0 && /*TODO make transitionAlert not dependent on "touched" to dismiss*/ formik.touched.username===false && <TransitionAlert errorMessage={signupError} onClose={() => setSignupError('')}/>}

            <TextField
                fullWidth
                id="username"
                autoComplete="username"
                label="이름"
                {...formik.getFieldProps('username')}
                error={Boolean(formik.touched.username && formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
                fullWidth
                id="bio"
                autoComplete="bio"
                label="소개"
                {...formik.getFieldProps('bio')}
                error={Boolean(formik.touched.bio && formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
            />
            
            {/* <Avatar sx={{mx:1, width:30, height:30, bgcolor: getAvatarColor(authedUser.nonauth.profile.username) }}> */}
                
            {/* </Avatar> */}
            <Button component="label" startIcon={
                photoLoading && <CircularProgress /> ||
                !photoLoading && <Avatar src={photo}></Avatar>
            }>
                사진
                <input name="pic" type="file" accept='image/*' hidden
                    onChange={(e) => {
                        if (!authedUser) return;
                        if (!e.target.files) return;
                        if (!e.target.files.length) return;
                        if (!e.target.files[0]) return;
                        if (!e.target.files[0].name) return;
                        const name = e.target.files[0].name;
                        const fileReader = new FileReader();
                        fileReader.onload = async () => {
                            if (fileReader.result == null) return;
                            if (fileReader.readyState === 2) {
                                /* Stop the rendering the user's image */
                                setPhotoLoading(true);
                                /* Acquire all the information of the user */
                                const users:UserEntity[] = await DataQuery.searchUserByUserID(authedUser.auth.uid);
                                if (!users.length) return; 
                                /* Delete initial picture from profile */
                                try { await ImageFactory.deleteFromFirebaseStorage(users[0].profile.picPath); } 
                                catch { }
                                /* Upload new picture to profile */
                                const path:string = await ImageFactory.saveToFirebaseStorage(
                                    new Uint8Array(fileReader.result as ArrayBuffer), 
                                    name);
                                try { await ProfileInteraction.setPic(authedUser.auth.uid, path); }
                                catch { }
                                setPhoto(await ImageFactory.pathToImageURL(path));
                                authedUser.nonauth.profile.picPath = path;
                                /* Render the user's updated image */
                                setPhotoLoading(false);
                            }
                        };
                        fileReader.readAsArrayBuffer(e.target.files[0]);
                    }}
                />
            </Button>
            
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={formik.isSubmitting}
            >
                시작
            </LoadingButton>
        </Stack>
        </Form>
    </FormikProvider>
    );
}
