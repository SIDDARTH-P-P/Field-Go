export const capitalizeFirstLetter = (value) => {
  if (typeof value !== 'string') {
    return ''; // or handle the case differently based on your requirements
  }
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
