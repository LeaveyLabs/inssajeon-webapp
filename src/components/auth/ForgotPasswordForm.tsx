import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/hooks/useAuth';
//component
import TransitionAlert from './TransitionAlert';

// ----------------------------------------------------------------------

type ForgotPasswordValues = {
  email: string;
};

interface Props {
  onSent: any;
};

export default function ForgotPasswordForm({onSent}: Props) {
  const { sendResetEmail } = useAuth();
  const [forgotError, setForgotError] = useState('');

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('올바른 이메일 주소 입력하세요')
      .required('필수'),
  });

  const formik = useFormik<ForgotPasswordValues>({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { resetForm, setFieldValue, setFieldTouched, setSubmitting }) => {
      try {
        await sendResetEmail(values.email);
        onSent();
        //TODO navigate to "reset password page"
      } catch (error: any) {
        if (error.message) {
          setForgotError(error.message)
        }
      }
      setFieldValue('email', '');
      setFieldTouched('email', false);
      setSubmitting(false);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate >
        <Stack spacing={3}>
          {forgotError.length>0 && formik.touched.email===false && <TransitionAlert errorMessage={forgotError} onClose={() => setForgotError('')}/>}

          <TextField
            fullWidth
            id="email"
            {...formik.getFieldProps('email')}
            type="email"
            label="이메일 주소"
            disabled={formik.isSubmitting}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            회복 이메일 보내기
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}