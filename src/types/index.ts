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

export type Project = {
  name: string;
  description: string;
};

export type SpanInfo = {
  span: number;
  length: number;
  purlinSize: string;
};

export type SupportInfo = {
  support: number;
  lap: boolean;
  leftPercentage: number;
  rightPercentage: number;
};

export type BridgingSpacingInfo = {
  span: number;
  bridgings: number;
  field1: number;
  field2: number;
  field3: number;
};
