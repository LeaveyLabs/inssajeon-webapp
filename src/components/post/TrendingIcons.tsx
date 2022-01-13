import React from 'react'
import { PostEntity } from 'src/db/entities/posts/PostEntity'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { red } from '@mui/material/colors';

interface TrendingIconsProps {
  post: PostEntity;
}

export default function TrendingIcons( {post} : TrendingIconsProps) {
  return (
    <div>
        {post.metrics.upvoteCount > 0 && <LocalFireDepartmentIcon sx={{ color: red[500] }}/>}
    </div>
  )
}
