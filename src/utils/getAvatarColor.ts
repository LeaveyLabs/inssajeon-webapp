// ----------------------------------------------------------------------

import { blue, deepOrange, green, grey, red, yellow } from "@mui/material/colors";

const PRIMARY_NAME = ['A', 'B', 'C', 'D', 'E', '9', '8'];
const INFO_NAME = ['F', 'G', 'H', 'J', '1', '2', '3', '0'];
const SUCCESS_NAME = ['K', 'L', 'M', 'N', 'O', '4', '5'];
const WARNING_NAME = ['P', 'Q', 'R', 'S', 'T', 'U', '6', '7'];
const ERROR_NAME = ['V', 'W', 'X', 'I', 'Y', 'Z'];

function getFirstCharacter(name: string) {
  return name.charAt(0).toUpperCase();
}

export default function getAvatarColor(name: string) {
  if (PRIMARY_NAME.includes(getFirstCharacter(name))) return deepOrange[200];
  if (INFO_NAME.includes(getFirstCharacter(name))) return blue[200];
  if (SUCCESS_NAME.includes(getFirstCharacter(name))) return green[200];
  if (WARNING_NAME.includes(getFirstCharacter(name))) return yellow[200];
  if (ERROR_NAME.includes(getFirstCharacter(name))) return red[200];
  return grey[200];
}