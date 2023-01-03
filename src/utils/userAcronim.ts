export function userAcronim(name: string) {
  let username = name.split(' ');
  let acronym = '';
  if (username.length > 1) {
    acronym = username[0].charAt(0) + username[1].charAt(0);
  } else {
    acronym = username[0].charAt(0);
  }
  return acronym;
}
