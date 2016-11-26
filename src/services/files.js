export function convertToBase64(file, onLoadCallback) {
  const reader = new FileReader();

  reader.onloadend = onLoadCallback;
  reader.readAsDataURL(file);
}

export function fetchFilesFromInput(event) {
  return [].slice.call(event.target.files);
}
