
// @mui;
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import {IconButton} from '@mui/material'

interface ClearSearchButtonProps {
  handleClear: VoidFunction
}

export default function ClearSearchButton ( {handleClear}: ClearSearchButtonProps) {
  let theme = useTheme()

  return (
    <IconButton 
      onClick={handleClear} 
      sx={{
        right:theme.spacing(1.5),
        top:theme.spacing(1),
        zIndex:3,
        height: 'auto',
        position: 'absolute',
      }}>
      <ClearIcon fontSize='small' color='primary'  />
    </IconButton>
  )
}