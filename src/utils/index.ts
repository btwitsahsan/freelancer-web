export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    // Get components in UTC
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const hourStr = String(hours).padStart(2, '0');
  
    return `${month}-${day} ${hourStr}:${minutes} ${ampm}`;
}