import { Avatar, SxProps } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ImageFactory } from 'src/db/apis/ImageFactory';
import getAvatarColor from 'src/utils/getAvatarColor'
import useAuth from '../../hooks/useAuth';

interface CustomAvatarProps {
  id: string | undefined;
  picPath: string | undefined;
  sx?: SxProps;
}

//NOT IN USE RIGHT NOW
export default function CustomAvatar( {id, picPath, sx} : CustomAvatarProps ) {
  const {authedUser} = useAuth();
  const [photo, setPhoto] = useState('');
  /* User is initially loading up the photo */
  // const [photoLoading, setPhotoLoading] = useState(true);

  useEffect(() => { //resets form when moving away from page
    async function updatePic() {
      if (picPath) {
        try {
          setPhoto(await ImageFactory.pathToImageURL(picPath));
        } catch {
          console.error("cant find pic");
        }
      }
    }
    /* Load photo */
    updatePic();
    // setPhotoLoading(false);
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [picPath]);

  if (id && picPath) {
    return (
      <Avatar sx={{...sx }} src={photo} />
    )
  } else if (id) {
    return (
      <Avatar sx={{...sx, bgcolor: getAvatarColor(id) }} />
    )
  } else {
    return (
      <Avatar sx={{...sx }} />
    )
  }
}
