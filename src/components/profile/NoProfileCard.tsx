// @mui
import { Container, Typography } from '@mui/material';
// ----------------------------------------------------------------------

export default function NoProfileCard( ) {
  //const { user } = useAuth();

  //TODO the submit button floats to the top in this scenario...

  return (
    <Container>
      <Typography variant="h4">
        이 단어를 정의해본 사람이 없습니다.
        <br/>
        <br/>
        정의하기
      </Typography>
    </Container>
  );
}
