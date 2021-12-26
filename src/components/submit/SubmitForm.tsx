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
  { 
    word: '대학',
    trendscore: 100,
  },
  { 
    word: '가족',
    trendscore: 10,
  },
  { 
    word: '음식',
    trendscore: 1,
  },
];

export type NewPostFormValues = {
  word: string;
  definition: string;
  quote: string;
  tags: string[];
};

// ----------------------------------------------------------------------

interface SubmitFormProps {
  handleClose: VoidFunction
}

export default function SubmitForm( {handleClose} : SubmitFormProps) {
  let navigate = useNavigate();
  //let [tagsInputValue, setTagsInputValue] = React.useState('')

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
      <Form autoComplete="off" noValidate> {/* onSubmit is implicit within formik's Form component // noValidate turns off auto browser validation*/} 
        <Stack spacing={2}>
          <TextField 
            id="word" //required
            type="text" //required
            fullWidth 
            placeholder="갑분사"
            label="단어 또는 표현" 
            {...formik.getFieldProps('word')} //wrapper for onChange, onBlur, value, checked. you no longer need to use formik's name prop either
            error={ Boolean(formik.errors.word) && formik.touched.word }
            helperText={ formik.errors.word && formik.touched.word && String(formik.errors.word) }
          />
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
            error={ Boolean(formik.errors.definition) && formik.touched.definition }
            helperText={ formik.errors.definition && formik.touched.definition && String(formik.errors.definition) }
          />
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
            error={ Boolean(formik.errors.quote) && formik.touched.quote }
            helperText={ formik.errors.quote && formik.touched.quote && String(formik.errors.quote) }
          />
          <Autocomplete
            multiple
            freeSolo
            value={formik.values.tags}
            onChange={(event, newValue) => {
              formik.setFieldValue('tags', newValue);
            }}
            style={{ width: 500 }} //TODO fix this
            options={TAGS_OPTIONS.map((option) => option.word).filter(tag => !formik.values.tags.includes(tag))}
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
            renderInput={(params) => 
              <TextField 
                {...params} 
                label="태그" 
                id="tags"
                {...formik.getFieldProps('tags')} //not sure if this is actually needed. this autocomplete seciton seems to function fine without it
                error={ formik.values.tags.length<3 && formik.touched.tags }
                helperText={ formik.values.tags.length<3 && formik.touched.tags && String("적어도 태그 3개 선택하세요") }
              />
            }
          />
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              fullWidth
              type="button"
              color="inherit"
              variant="contained"
              size="large"
              sx={{ mr: 1.5 }}
              onClick={handleClose}
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
        </Stack>
      </Form>
    </FormikProvider>
  );
}