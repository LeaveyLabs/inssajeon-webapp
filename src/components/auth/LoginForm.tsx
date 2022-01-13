import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PAGE_PATHS } from 'src/routing/paths';
// hooks
import useAuth from 'src/hooks/useAuth';
// components
import TransitionAlert from './TransitionAlert';
import Iconify from '../misc/Iconify';
import { browserLocalPersistence, browserSessionPersistence, setPersistence } from 'firebase/auth';
import { firebaseAuth } from 'src/firebase';

// ----------------------------------------------------------------------

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function LoginForm() {
  let navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup
      .string()
      .required('필수'),
    password: Yup
      .string()
      .required('필수'),
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setFieldValue, setFieldTouched, setSubmitting, resetForm }) => {
      try {
        await login(values.email, values.password);
        await setPersistence(firebaseAuth, values.remember ? browserLocalPersistence : browserSessionPersistence)
        navigate(PAGE_PATHS.dashboard.home, { replace: true });
        resetForm();
      } catch (error: any) {
        if (error.message) {
          setLoginError(error.message)
        }
      }
      setFieldValue('password', '');
      setFieldValue('email', '');
      setFieldTouched('password', false);
      setFieldTouched('email', false);
      setSubmitting(false);
    },
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate >
        <Stack spacing={3}>
          {loginError.length>0 && formik.touched.email===false && <TransitionAlert errorMessage={loginError} onClose={() => setLoginError('')}/>}

          <TextField
            fullWidth
            id="email"
            autoComplete="email"  //?? look more into later https://mui.com/api/text-field/
            type="email"
            label="이메일 주소"
            {...formik.getFieldProps('email')}
            disabled={formik.isSubmitting}
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
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...formik.getFieldProps('remember')} checked={formik.values.remember} />}
            label="나를 기억하기"
          />

          <Link component={RouterLink} variant="subtitle2" to={PAGE_PATHS.auth.forgot}>
            건망증 오늘따라 심해요?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={formik.isSubmitting}
        >
          로그인
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
