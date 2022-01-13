import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/hooks/useAuth';
// components
import TransitionAlert from './TransitionAlert';
//utils
import isValidUsername from 'src/utils/isValidUsername'
import { ProfileInteraction } from 'src/db/apis/ProfileInteraction';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATHS } from 'src/routing/paths';
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
      let isUsernameTaken = await isValidUsername(values.username);
      if (isUsernameTaken) {
        setSignupError("입력하신 이름은 이미 사용중이에요. 다시 골라주세요")
      }
      else {
        try {
          if (authedUser) {
            await ProfileInteraction.setUsername(authedUser.auth.uid, values.username);
            navigate(PAGE_PATHS.dashboard.home, { replace: true });
          }
          else { //this should never be reached because CreateProfileForm only appears after being logged in
            setSignupError("오류가 발생했습니다. 로그인 페이지로 돌아가는 중...")
            setTimeout(() => { 
              navigate(PAGE_PATHS.auth.login, { replace: true });
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
