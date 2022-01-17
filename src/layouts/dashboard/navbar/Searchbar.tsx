import SearchIcon from '@mui/icons-material/Search';
import { ClickAwayListener } from '@mui/material';
import InputBase from '@mui/material/InputBase';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { PAGE_PATHS } from 'src/routing/paths';
// components
//TODO: finish the blur/focus issues with the clear search button
//TODO: improve the shrink transition onBlur for searchbar.
import ClearSearchButton from './ClearSearchButton';

// ----------------------------------------------------------------------

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.3),
  zIndex:3,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative', //so SearchIconWrapper can be placed absolutely within
  height: '20',
  maxWidth:'100%',
  borderRadius:10,
  zIndex:2,
  [theme.breakpoints.down('desktop')]: {
    backgroundColor: 'transparent',
    marginRight: theme.spacing(7.5),
    borderRadius: 25,
    width: '4.7ch',
  },
  [theme.breakpoints.up('desktop')]: {
    marginRight: theme.spacing(9),
    backgroundColor: theme.palette.grey[200],
    borderRadius: 10,
    width: '11ch',
  },
  transition: theme.transitions.create([
    "border-color",
    "background-color",
    'width',
    'margin-right',
  ]),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    [theme.breakpoints.up('desktop')]: {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 3px`,
    }
  },
  "&:focus-within": {
    backgroundColor: theme.palette.grey[200],
    width: '60ch',
    marginRight: 0,
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 3px`,
    borderColor: theme.palette.primary.main,
  }
}));

const StyledInputBase = styled(InputBase)(({ theme  }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    maxWidth: '100',
    height:'3ch',
    border:1,
  },
  width:'90%', //TODO pass searchInput as prop and make width 100% when searchInput.lenght==0
}));

export default function Searchbar(  ) {
  let [searchInput, setSearchInput] = useState('');
  let inputRef = useRef<HTMLInputElement>()

  let handleBlur = () => {
    setSearchInput('')
  }

  let handleClear = () => {
    setSearchInput('')
    if (inputRef.current) { //a typescript check that the ref is indeed defined
      inputRef.current.focus(); //TODO focus the input on handleClear
    }
  }
  
  let navigate = useNavigate();

  const handleKeyDown = (event : React.KeyboardEvent ) : void => {
    if (event.key === 'Enter') {
      if(!searchInput.length) return;
      const target = event.target as HTMLTextAreaElement;
      navigate(`${PAGE_PATHS.dashboard.words}/${searchInput}`);
      setTimeout(() => {
        target.blur();
      }, 10); //TODO idk if this works
    }
  }

  //*if we dont have the clickaway listener, then if the user taps on close button then taps on home screen, searchbar will not dismiss*/}
  return (
    <ClickAwayListener onClickAway={handleBlur}> 
      <Search >
        <SearchIconWrapper>
          <SearchIcon fontSize='large' color='primary'  />
        </SearchIconWrapper>
        <StyledInputBase type='text' ref={inputRef} autoComplete='off' onBlur={handleBlur} value={searchInput} onChange={event => setSearchInput(event.target.value)} placeholder="겸색..." id='search-input' onKeyDown={event => handleKeyDown(event)}/>
        { searchInput.length !== 0 &&
          <ClearSearchButton handleClear={handleClear}/>
        } 
      </Search>
    </ClickAwayListener>
  );
}


//ANOTHER INPUTBASE TO REFERENCE LATER ON FOR MORE BEAUTIFICATION:

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   "& .MuiInputBase-input": {
//     borderRadius: 4,
//     position: 'relative',
//     zIndex:2,
//     width: '6ch',
//     height:'3ch',
//     maxWidth:'100%',
//     marginRight: theme.spacing(7.5),
//     [theme.breakpoints.up('desktop')]: {
//       marginRight: theme.spacing(0)
//     },
//     backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 12px",
//     transition: theme.transitions.create([
//       "border-color",
//       "box-shadow",
//       'width',
//       'margin-right',
//     ]),
//     '&:hover': {
//       backgroundColor: theme.palette.grey[200],
//     },
//     "&:focus": {
//       backgroundColor: theme.palette.grey[200],
//       width: '80ch',
//       marginRight: 0,
//       boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
//       borderColor: theme.palette.primary.main,
//     }
//   }
// }));
