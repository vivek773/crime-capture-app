export function simulateCapture(cops: any[], criminalCityId: number) {
    return cops.find(cop => cop.city_id === criminalCityId) || null;
  }
  