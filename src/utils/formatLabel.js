const formatLabel = (value) => {
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1).replace(/_/g, ' ');
    }
    return value;
  };
  export default formatLabel;
  