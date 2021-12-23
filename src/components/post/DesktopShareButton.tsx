import * as React from 'react';
import { useState } from 'react';
//mui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import IosShareIcon from '@mui/icons-material/IosShare';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Zoom from '@mui/material/Zoom';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function DesktopShareButton() {
  const [isCopied, setIsCopied] = useState(false);
  const [copyText, setCopyText] = useState("클립보드에 복사");

  const onCopyText = () => {
    setIsCopied(true);
    setCopyText("클립보드에 복사됩")
  };

  const handleTooltipClose = () => {
    setTimeout(() => {
      setIsCopied(false);
      setCopyText("클립보드에 복사")
    }, 10);
  }

  return (
    <CopyToClipboard text="inssajeon.com" onCopy={onCopyText}>
      <LightTooltip TransitionComponent={Zoom} onClose={handleTooltipClose} title={copyText} leaveDelay={200}>
        {!isCopied ?
        <IconButton sx={{mr:1}}>
          <ContentCopy color="primary" fontSize="small" />
        </IconButton>
        :
        <IconButton sx={{mr:1}} >
          <ContentCopy color="success" fontSize="small" />
        </IconButton>
        }
      </LightTooltip>
    </CopyToClipboard>
  )
}