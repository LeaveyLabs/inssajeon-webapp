import { LoadingButton } from '@mui/lab';
// @mui
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
// hooks
import useAuth from 'src/hooks/useAuth';
import { PAGE_PATHS } from 'src/routing/paths';
import * as Yup from 'yup';
// components
import Iconify from '../misc/Iconify';
import TransitionAlert from './TransitionAlert';

// ----------------------------------------------------------------------

type InitialValues = {
  password: string;
  passwordConfirmation: string,
};

export default function ResetPasswordForm( ) {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("oobCode");
  const navigate = useNavigate();
  const { confirmResetPassword  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [signupError, setSignupError] = useState('');

  /* Prevent any user from entering this page without a code. */
  if(!id || id === '') {
    navigate(PAGE_PATHS.dashboard.home);
  }

  const RegisterSchema = Yup.object().shape({
    password: Yup
      .string()
      .required('필수')
      .min(8, '8글자 이상')
      .max(20, '20글자 이하'),
    passwordConfirmation: Yup
      .string()
      .required('필수')
      .oneOf([Yup.ref('password'), null], '비밀번혀가 서로 맞지 않습니다'),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, setFieldValue, setFieldTouched }) => {
      if(id !== null)  {
        try {
          await confirmResetPassword(id, values.password);
          navigate(PAGE_PATHS.auth.login);
        }
        catch (error:any) {
          setSignupError(error.message);
          setFieldValue('password', '');
          setFieldValue('passwordConfirmation', '');
          setFieldTouched('password', false);
          setFieldTouched('passwordConfirmation', false);
          setSubmitting(false);
        }
      }
    }
  })

  useEffect(() => { //resets form when moving away from page
    return () => {
      formik.setSubmitting(false);
      setShowPassword(false);
      setShowPasswordConfirmation(false);
      setSignupError('');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          {signupError.length>0 && formik.touched.password===false && <TransitionAlert errorMessage={signupError} onClose={() => setSignupError('')}/>}
          <TextField
            fullWidth
            id="password"
            autoComplete="password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            {...formik.getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            id="passwordConfirmation"
            autoComplete="passwordConfirmation"
            type={showPasswordConfirmation ? 'text' : 'password'}
            label="비밀번호 확인"
            {...formik.getFieldProps('passwordConfirmation')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPasswordConfirmation((prev) => !prev)}>
                    <Iconify icon={showPasswordConfirmation ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(formik.touched.passwordConfirmation && formik.errors.passwordConfirmation)}
            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            비밀번호 재설정
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
