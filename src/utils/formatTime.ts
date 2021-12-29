import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number) {
  /* Calculate the difference between now and the date in milliseconds. */
  const msDiff:number = (new Date()).valueOf() - (new Date(date)).valueOf();

  /* Convert to seconds. */
  const secDiff:number = Math.floor(msDiff/1000);
  /* If below a minute, show difference in seconds. */
  if(secDiff < 60) return `${secDiff}초 전`;

  /* Convert to minutes. */
  const minDiff:number = Math.floor(secDiff/60);
  /* If below an hour, show difference in minutes. */
  if(minDiff < 60) return `${minDiff}분 전`;

  /* Convert to hours. */
  const hourDiff:number = Math.floor(minDiff/60);
  /* If below a day, show difference in hours. */
  if(hourDiff < 24) return `${hourDiff}시간 전`;

  /* Convert to days. */
  const dayDiff:number = Math.floor(hourDiff/24);
  /* If below a week, show difference in hours. */
  if(dayDiff < 7) return `${dayDiff}일 전`;

  /* Otherwise, return the specific date. */
  return format(new Date(date), 'dd일 mm월 yyyy년');
}


// export function fDateTime(date: Date | string | number) {
//   return format(new Date(date), 'dd MMM yyyy p');
// }

// export function fTimestamp(date: Date | string | number) {
//   return getTime(new Date(date));
// }

// export function fDateTimeSuffix(date: Date | string | number) {
//   return format(new Date(date), 'dd/MM/yyyy hh:mm p');
// }

// export function fToNow(date: Date | string | number) {
//   return formatDistanceToNow(new Date(date), {
//     addSuffix: true
//   });
// }
