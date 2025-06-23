export function formatCityName(city: string): string {
    if (!city) return ''
  
    return city
      .split(' ') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
      .join(' ')
  }
  