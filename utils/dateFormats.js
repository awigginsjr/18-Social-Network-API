const addDateSuffix = (date) => { // Helper function that adds the appropriate suffix to the date
    const suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th']; 
  
    const dateString = date.toString(); // Convert the date to a string
    const lastTwoDigits = parseInt(dateString.slice(-2));
  
    let suffixIndex;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) { // If the date is between 11 and 13, use 'th'
      suffixIndex = 0;
    } else {
      suffixIndex = lastTwoDigits % 10; // Otherwise, use the appropriate suffix
    }
  
    const suffix = suffixes[suffixIndex]; // Get the suffix from the array
    return `${date}${suffix}`; // Return the date and the suffix
};
  
const formatTimestamp = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => { // Function that formats a timestamp
    const months = {
      0: monthLength === 'short' ? 'Jan' : 'January',
      1: monthLength === 'short' ? 'Feb' : 'February',
      2: monthLength === 'short' ? 'Mar' : 'March',
      3: monthLength === 'short' ? 'Apr' : 'April',
      4: monthLength === 'short' ? 'May' : 'May',
      5: monthLength === 'short' ? 'Jun' : 'June',
      6: monthLength === 'short' ? 'Jul' : 'July',
      7: monthLength === 'short' ? 'Aug' : 'August',
      8: monthLength === 'short' ? 'Sep' : 'September',
      9: monthLength === 'short' ? 'Oct' : 'October',
      10: monthLength === 'short' ? 'Nov' : 'November',
      11: monthLength === 'short' ? 'Dec' : 'December',
    };
  
    const dateObj = new Date(timestamp); // Create a new Date object
    const formattedMonth = months[dateObj.getMonth()]; // Get the month from the months object
  
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate(); // Get the day of the month
  
    const year = dateObj.getFullYear(); // Get the year
    let hour = dateObj.getHours() > 12 ? Math.floor(dateObj.getHours() - 12) : dateObj.getHours(); // Get the hour
    if (hour === 0) { // If the hour is 0, set it to 12
      hour = 12;
    }
  
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes(); // Get the minutes
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am'; // Get the period of the day
  
    return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`; // Return the formatted timestamp
};

module.exports = formatTimestamp; // Export the formatTimestamp function