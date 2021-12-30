import React from 'react'
import { Skeleton } from '@mui/material';
import { Box, } from '@mui/material';

export default function PostSkeleton() {
  return (
    <div>
      <Box sx={{ height:60, display:'flex', flexDirection: "row", alignItems:"center", justifyContent:"flex-start", }}>
        <Skeleton animation='wave' variant="circular" width={40} height={40} sx={{marginLeft:2}}/>
        <Skeleton height={30} sx={{flexGrow:1, marginX:2}} />
      </Box>
      <Skeleton sx={{borderRadius:2}} variant='rectangular' width="100%" height="25ch"></Skeleton>
    </div>
  )
}
