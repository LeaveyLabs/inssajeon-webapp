import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface Word {
  word: string;
  trendscore: number;
}

const topFilms = [
  { word: '화이팅', trendscore: 100 },
  { word: '갑분사', trendscore: 50 },
  { word: '인싸', trendscore: 1 },
];

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AutocompleteSearch() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Word[]>([]);
  const [inputText, setInputText] = React.useState('');
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  //advanced filtering to find words that are close matches, even if not perfect
  //this works for english but idk if it works for korean
  //const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue);


  return (
    <Autocomplete
      id="asynchronous-demo"
      // /filterOptions={filterOptions} //disables built in filtering of autocomplete component to allow "search as you type"
      sx={{ width: 1 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.word === value.word}
      getOptionLabel={(option) => option.word}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="검색"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
