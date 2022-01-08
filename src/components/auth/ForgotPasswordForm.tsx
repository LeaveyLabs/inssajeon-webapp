import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

type ForgotPasswordValues = {
  email: string;
  afterSubmit?: string;
};

interface Props {
  onSent: any;
};

export default function ForgotPasswordForm({onSent}: Props) {
  const { resetPassword } = useAuth();
  //const isMountedRef = useIsMountedRef();

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
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        resetPassword?.(values.email);
        // if (isMountedRef.current) {
        //   onSent();
        //   onGetEmail(formik.values.email);
        //   setSubmitting(false);
        // }
      } catch (error) {
        console.error(error);
        // if (isMountedRef.current) {
        //   setSubmitting(false);
        //   setErrors({ afterSubmit: error.message });
        // }
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate >
        <Stack spacing={3}>
          {formik.errors.afterSubmit && <Alert severity="error">{formik.errors.afterSubmit}</Alert>}

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