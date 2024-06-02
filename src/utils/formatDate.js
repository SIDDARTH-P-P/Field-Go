const formatDate = (dateString) => {
    if (!dateString) return '-';
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB');
    return formattedDate;
  };
  export default formatDate;
  