import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import {
  Link,
  Stack,
  Alert,
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
import Iconify from '../misc/Iconify';

// ----------------------------------------------------------------------

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
  afterSubmit?: string; //for setting an error if login fails
};

export default function LoginForm() {
  let navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

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
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login(values.email, values.password);
        setSubmitting(false);
        //TODO 'welcome back!' dialogue
        //TODO handle the case where 'remember me' is checked
        //TODO push to home page
      } catch (error: any) {
        resetForm();
        setSubmitting(false);
        if (error.message) {
          setErrors({ afterSubmit: error.message });
        }
      }
    },
  });

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate >
        <Stack spacing={3}>
          {formik.errors.afterSubmit && <Alert severity="error">{formik.errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            id="username"
            autoComplete="username"  //?? look more into later https://mui.com/api/text-field/
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
            비밀번호를 잊으셨습니까?
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
