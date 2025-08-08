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

export type Load = {
  LoadType: 'UDL' | 'Point' | 'Line';
  LoadDirection: 'parallel' | 'perpendicular' | '';
  LoadApplication: 'part' | 'one' | 'multiple' | 'all' | '';
  Units: 'kN/m' | 'kN' | 'kPa' | '';
  Force: number;
};

export type AxialLoad = {
  Value: number;
  Type: 'Tension' | 'Compression';
};

export type MovingLoad = {
  LeftBound: LoadLocation;
  RightBound: LoadLocation;
  WidthMM: number;
  Units: 'kN/m' | 'kPa';
  PressureKPa: number;
  PurlinSpacingMM: number;
  NumTestPositions: number;
};
