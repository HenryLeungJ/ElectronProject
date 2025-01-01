export default function compare(s, c, uppercase) {
  const c1 = s.charCodeAt(0);
  var c2 = uppercase ? c : String.fromCharCode(c).toLowerCase().charCodeAt(0);
  if (c == 188) {
    c2 = ",".charCodeAt(0);
  } else if (c == 190) {
    c2 = ".".charCodeAt(0);
  } else if (uppercase && c == 191) {
    c2 = "?".charCodeAt(0);
  } else if (uppercase && c == 222) {
    c2 = '"'.charCodeAt(0);
  } else if (c == 222) {
    c2 = "'".charCodeAt(0);
  } else if (c == 189) {
    c2 = "-".charCodeAt(0);
  }
  return c1 == c2;
}
