export function isEmpty(obj, skipProp = 'id') {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const isPropEmpty = obj[key] === null || obj[key].length === 0;

      if (!isPropEmpty && key !== skipProp) return false;
    }
  }

  return true;
}
