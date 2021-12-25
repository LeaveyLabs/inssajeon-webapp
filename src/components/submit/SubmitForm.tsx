import * as Yup from 'yup';
// import { useCallback, useState } from 'react'; somehow callbacks can be useful for forms
import { useFormik, Form, FormikProvider, ErrorMessage, ErrorMessageProps } from 'formik';
//react
import { useNavigate, Link } from "react-router-dom";
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Alert, Chip, Stack, Switch, Button, TextField, Typography, Autocomplete, FormHelperText, FormControlLabel, styled } from '@mui/material';
//

// ----------------------------------------------------------------------

const TAGS_OPTIONS = [
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
  let navigate = useNavigate();

  const NewPostSchema = Yup.object().shape({
    word: Yup
      .string()
      .required('Word is required'),
    definition: Yup
      .string()
      .required('Definition is required'),
    quote: Yup
      .string()
      .min(5, "at least that long!")
      .required('Quote is required'),
    tags: Yup
      .mixed()
      .required('Tags are required'),
  });

  const formik = useFormik<NewPostFormValues>({ //<NewPostFormValues is necessary for typescript
    initialValues: {
      word: '',
      definition: '',
      quote: '',
      tags: ['음식'],
    },
    validationSchema: NewPostSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => { //if onSubmit is async isSubmitting automotically gets set to false after the async completes? read more here: https://github.com/jaredpalmer/formik/issues/2442#
          setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
          navigate("/post/", { replace: true }); //navigate to that submitted post
        }, 1000);

        //present modal: POST UPLOADED, click to view now! // click to share with friends!
      
    },
  });

  return (
    <FormikProvider value={formik}> {/* FormikProvider allows you to define the formik context above and then pass it as a prop*/}
      <Form> {/* onSubmit is implicit within formik's Form component*/}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField 
                  id="word" //required
                  type="text" //required
                  fullWidth 
                  placeholder="갑분사"
                  label="단어 또는 표현" 
                  {...formik.getFieldProps('word')} //wrapper for onChange, onBlur, value, checked. you no longer need to use formik's name prop either
                />
                <ErrorMessage name="word" render={msg => <Alert severity="error">{msg}</Alert>} /> {/*renders if touched=true, error=true and errormessage exists*/}
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={5}
                  id="definition"
                  type="text"
                  placeholder="정확한 정의가 아니어도 괜찮아요"
                  label="정의"
                  {...formik.getFieldProps('definition')}
                />
                <ErrorMessage name="definition" render={msg => <Alert severity="error">{msg}</Alert>} />
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  maxRows={5}
                  id="quote"
                  type="text"
                  placeholder="여기는 도움이 되는 예문을 쓰세요"
                  label="인용 또는 예문"
                  {...formik.getFieldProps('quote')}
                />
                <ErrorMessage name="quote" render={msg => <Alert severity="error">{msg}</Alert>} />
                <Autocomplete
                  multiple
                  freeSolo
                  value={formik.values.tags}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('tags', newValue);
                  }}
                  options={TAGS_OPTIONS.map((option) => option)}
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
                <ErrorMessage name="tags" render={msg => <Alert severity="error">{msg}</Alert>} />
              </Stack>
            </Card>

            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
              <Button
                fullWidth
                type="button"
                color="inherit"
                variant="contained"
                size="large"
                sx={{ mr: 1.5 }}
                component={Link}
                to="/"
                disabled={formik.isSubmitting}
              >
                취소
              </Button>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={formik.isSubmitting}
              >
                입력
              </LoadingButton>
            </Stack>
          </Grid>
      </Form>
    </FormikProvider>
  );
}