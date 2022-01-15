import { LoadingButton } from '@mui/lab';
// @mui
import { Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileInteraction } from 'src/db/apis/ProfileInteraction';
// hooks
import useAuth from 'src/hooks/useAuth';
import { PAGE_PATHS } from 'src/routing/paths';
//utils
import isValidUsername from 'src/utils/isValidUsername';
import * as Yup from 'yup';
// components
import TransitionAlert from './TransitionAlert';
//db

// ----------------------------------------------------------------------

type InitialValues = {
  username: string;
};

export default function CreateProfileForm(  ) {
  let navigate = useNavigate();
  const { authedUser } = useAuth();
  const [signupError, setSignupError] = useState('');

  const CreateProfileSchema = Yup.object().shape({
    username: Yup
      .string()
      .min(5, '5글자 이상')
      .required('필수'),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      username: '',
    },
    validationSchema: CreateProfileSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm, setFieldValue, setFieldTouched }) => {
      if (!await isValidUsername(values.username)) {
        setSignupError("입력하신 이름은 이미 사용중이에요. 다시 골라주세요")
      }
      else {
        try {
          if (authedUser) {
            // await ProfileInteraction.setPic();
            await ProfileInteraction.setUsername(authedUser.auth.uid, values.username); //TODO combine these two firebase calls into one
            navigate(PAGE_PATHS.dashboard.home);
          }
          else { //this should never be reached because CreateProfileForm is only accessible for authedUsers with 0 upvotes
            setSignupError("오류가 발생했습니다. 로그인 페이지로 돌아가는 중...")
            setTimeout(() => { 
              navigate(PAGE_PATHS.auth.signup);
            }, 3000)
          }
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
    return () => {
      setSignupError('');
      formik.resetForm();
    };
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
