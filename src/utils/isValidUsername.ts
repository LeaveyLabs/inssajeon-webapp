
import { DataQuery, ProfileOrder } from 'src/db/apis/DataQuery';
export default async function isValidUsername(username: string) {
  //these arent okay because of how our routing works
  if (username === 'profile' || username === 'me') {
    return false;
  }
  //firebase call to check if username already exists
  let usersWithThatName = await DataQuery.searchUserByUserProfile({username: username}, ProfileOrder.Alphabetical);
  if (usersWithThatName.length > 0) {
    return false;
  }
  return true;
}