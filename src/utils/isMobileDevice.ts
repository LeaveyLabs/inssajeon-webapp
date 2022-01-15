
// ----------------------------------------------------------------------

export default function isMobileDevice() {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}
