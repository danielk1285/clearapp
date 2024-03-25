function formatFinanceNumber(number: string) {
    const floatValue =parseFloat(number.replace(/,/g, ''));
    
    if (isNaN(floatValue)) {
      return '';
    }
    const parts = floatValue.toFixed(2).toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  export default formatFinanceNumber;  