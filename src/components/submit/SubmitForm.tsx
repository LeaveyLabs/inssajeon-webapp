import * as Yup from 'yup';
// import { useCallback, useState } from 'react'; somehow callbacks can be useful for forms
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Grid,
  Card,
  Chip,
  Stack,
  Switch,
  Button,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
//

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  '대학',
  '가족',
  '음식',
];

export type NewPostFormValues = {
  word: string;
  definition: string;
  quote: string;
  tags: string[];
};

// ----------------------------------------------------------------------

export default function SubmitForm() {

  const NewPostSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const formik = useFormik<NewPostFormValues>({
    initialValues: {
      word: '',
      definition: '',
      quote: '',
      tags: ['음식'],
    },
    validationSchema: NewPostSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        //TODO: firebase call
        resetForm();
        setSubmitting(false);
        //TODO: display POSt SUCCESS somewhere and do something
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="on" onSubmit={handleSubmit}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField 
                    required
                    fullWidth 
                    label="단어" 
                    {...getFieldProps('word')} />
                  <TextField
                    required
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="정의"
                    {...getFieldProps('definition')}
                  />
                  <TextField
                    required
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={5}
                    label="인용 또는 예문"
                    {...getFieldProps('quote')}
                  />
                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={option}
                          size="small"
                          label={option}
                        />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} label="태그" />}
                  />
                </Stack>
              </Card>

              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  fullWidth
                  type="button"
                  color="inherit"
                  variant="outlined"
                  size="large"
                  // onClick={}
                  sx={{ mr: 1.5 }}
                >
                  취소
                </Button>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  // loading={isSubmitting}
                >
                  입력
                </LoadingButton>
              </Stack>
            </Grid>
        </Form>
      </FormikProvider>
    </>
  );
}