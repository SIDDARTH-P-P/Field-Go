const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC'
    };
    const formattedDateTime = new Date(dateString).toLocaleString('en-GB', options);
    return formattedDateTime;
  };
  
  export default formatDateTime;
  