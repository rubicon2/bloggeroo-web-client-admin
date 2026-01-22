export default function fixInputDate(dateString) {
  // Cut off the .00Z at the end of a date string if it appears.
  // That stops the datetime-local from correctly displaying the existing date.
  // What an annoying quirk. Why does it not work with the .00Z, if that is part
  // of the standardised date format? The server returns the datetime as stored
  // by prisma. In fact if the Z appears at all even without the .00, it fails to show.
  return dateString ? dateString.split('.')[0] : '';
}
