// src/types/loadCases.ts
export type LoadCase = {
  Name: string;
};

export type PrimaryLoadCase = {
  Name: string;
  Cases: LoadCase[];
  Type: 'Strength' | 'Serviceability';
  DeflectionLimit: number;
};

export type CombinedLoadCase = {
  Name: string;
  Cases: LoadCase[]; // Use existing LoadCase type
  Type: 'Strength' | 'Serviceability';
  DeflectionLimit: number;
};

export type LoadLocation = {
  Title: string;
  PointOfReference: 'leftEnd' | 'rightEnd';
  LengthType: 'mm' | 'length';
  Length: number;
};
