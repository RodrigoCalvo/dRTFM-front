export function isEmail(email: string) {
  const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  return regex.test(email);
}
