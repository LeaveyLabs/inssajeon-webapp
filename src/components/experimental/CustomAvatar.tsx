import { Avatar, SxProps } from '@mui/material'
import React from 'react'
import getAvatarColor from 'src/utils/getAvatarColor'

interface CustomAvatarProps {
  id: string | undefined;
  picPath: string | undefined;
  sx?: SxProps;
}

//NOT IN USE RIGHT NOW
export default function CustomAvatar( {id, picPath, sx} : CustomAvatarProps ) {
  if (id && picPath) {
    return (
      <Avatar sx={{...sx, bgcolor: getAvatarColor(id) }} src={picPath} />
    )
  } else {
    return (
      <Avatar sx={{...sx }} src={""} />
    )
  }
}
