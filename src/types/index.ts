export interface Material {
  id: string;
  name: string;
  category: string;
  description: string;
  properties: MaterialProperty[];
  useCases: string[];
  cost: number;
  sustainability: SustainabilityRating;
}

export interface MaterialProperty {
  name: string;
  value: string | number;
  unit?: string;
}

export interface SustainabilityRating {
  score: number;
  factors: string[];
}

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  data: ChartData[];
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}