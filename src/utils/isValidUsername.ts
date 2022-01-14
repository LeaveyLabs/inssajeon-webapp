
export default async function isValidUsername(username: string) {
  //these arent okay because of how our routing works
  if (username === 'profile' || username === 'me') {
    return false;
  }
  //firebase call to check if username already exists
}