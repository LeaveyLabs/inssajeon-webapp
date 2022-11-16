import ContentCopy from '@mui/icons-material/ContentCopy';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
//mui
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import * as React from 'react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PostInteraction } from 'src/db/apis/PostInteraction';
import useAuth from 'src/hooks/useAuth';
import UnstyledWhenDisabledIconButton from './UnstyledWhenDisabledIconButton';

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

export default function DesktopCopyButton(props: {isDisabled: Boolean, postID: string} ) {
  const {authedUser} = useAuth();
  const [isCopied, setIsCopied] = useState(false);
  const [copyText, setCopyText] = useState("클립보드에 복사");
  const [isInteracting, setIsInteracting] = useState(false);

  const onCopyText = async () => {
    setIsInteracting(true);
    setIsCopied(true);
    setCopyText("클립보드에 복사됩");
    if (authedUser) {
      try {
        await PostInteraction.sharePost(authedUser.nonauth.id, props.postID);
      } catch (error: any) {
        console.error(error.message);
      }
    }
    setIsInteracting(false);
  };

  const handleTooltipClose = () => {
    setTimeout(() => {
      setIsCopied(false);
      setCopyText("클립보드에 복사")
    }, 10);
  }

  //TODO copy tooltip icon looks weird on mobile. either dont display it on mobile or change it from a tooltip to some other component.
  return (
    <CopyToClipboard text={`https://inssajeon.com/post/${props.postID}`} onCopy={onCopyText}>
      <LightTooltip placement="top" TransitionComponent={Zoom} onClose={handleTooltipClose} title={copyText} leaveDelay={200}>
        {!isCopied ?
        <UnstyledWhenDisabledIconButton disabled={Boolean(isInteracting || props.isDisabled)}>
          <ContentCopy  fontSize="small" />
        </UnstyledWhenDisabledIconButton>
        :
        <UnstyledWhenDisabledIconButton disabled={Boolean(isInteracting || props.isDisabled)}>
          <ContentCopy color="success" fontSize="small" />
        </UnstyledWhenDisabledIconButton>
        }
      </LightTooltip>
    </CopyToClipboard>
  )
}