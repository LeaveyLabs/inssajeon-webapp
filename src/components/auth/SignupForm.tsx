import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/hooks/useAuth';
// components
import Iconify from '../misc/Iconify';
import TransitionAlert from './TransitionAlert';

// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
  password: string;
  passwordConfirmation: string,
};

export default function SignupForm() {
  const { signup,  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [signupError, setSignupError] = useState('');

  const RegisterSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('올바른 이메일 주소 입력하세요') //TODO check if already exists
      .required('필수'),
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
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm, setFieldValue, setFieldTouched }) => {
      signup(values.email, values.password)
      .then(() => {
        resetForm();
        //TODO push to "setup profile username" like reddit does
      })
      .catch((error: any) => {
        setSignupError(error.message)
        setFieldValue('password', '');
        setFieldValue('passwordConfirmation', '');
        setFieldTouched('password', false);
        setFieldTouched('passwordConfirmation', false);
      })
      .finally(() => {
        setSubmitting(false);
      })
    }
  })

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Stack spacing={3}>
          {signupError.length>0 && formik.touched.password===false && <TransitionAlert errorMessage={signupError} onClose={() => setSignupError('')}/>}
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="이메일 주소"
            id="email"
            {...formik.getFieldProps('email')}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

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
            가입하기
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
