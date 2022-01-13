import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/hooks/useAuth';

// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
  afterSubmit?: string;
};

type Props = {
  onSent: VoidFunction;
  onGetEmail: (value: string) => void;
};

export default function ResetPasswordForm({ onSent, onGetEmail }: Props) {
  const { resetPassword } = useAuth();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      email: 'demo@minimals.cc',
    },
    validationSchema: ResetPasswordSchema,
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

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('email')}
            type="email"
            label="Email address"
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Reset Password
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
