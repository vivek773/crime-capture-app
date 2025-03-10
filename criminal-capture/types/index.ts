export interface Cop {
  id: number;
  name: string;
}

export interface SelectionState {
  [key: string]: { city: string; cityId: any; vehicle: string; vehicleId: any };
}

export interface City {
  id: number;
  name: string;
  distance: string;
  image?: string;
}

export interface Cop {
  id: number;
  name: string;
}

export interface Vehicle {
  id: number;
  type: string;
  range: number;
  count: number;
}

export interface Vehicle {
  id: number;
  type: string;
  range: number;
  count: number;
}

export interface CopSelection {
  name: string;
  city_id: number | null;
  vehicle_id: number | null;
}

export interface ResultSelection {
  name: string;
  cityId: number | null;
}

export interface CitySelectorProps {
  selectedCity: string;
  onSelect: (city: string, cityId: number) => void;
}

export interface ModalComponentProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  children: React.ReactNode;
}
