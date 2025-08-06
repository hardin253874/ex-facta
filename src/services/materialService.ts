import { Material } from '@/types';

const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Recycled Steel',
    category: 'Metals',
    description: 'High-quality recycled steel with excellent structural properties',
    properties: [
      { name: 'Tensile Strength', value: 400, unit: 'MPa' },
      { name: 'Density', value: 7.85, unit: 'g/cm³' },
      { name: 'Yield Strength', value: 250, unit: 'MPa' },
    ],
    useCases: ['Building frames', 'Bridges', 'Industrial structures'],
    cost: 800,
    sustainability: {
      score: 85,
      factors: ['Recycled content', 'Low carbon footprint', 'Fully recyclable'],
    },
  },
  {
    id: '2',
    name: 'Bamboo Composite',
    category: 'Natural Materials',
    description: 'Sustainable bamboo-based composite material for construction',
    properties: [
      { name: 'Compressive Strength', value: 40, unit: 'MPa' },
      { name: 'Density', value: 0.6, unit: 'g/cm³' },
      { name: 'Moisture Content', value: 8, unit: '%' },
    ],
    useCases: ['Flooring', 'Wall panels', 'Furniture'],
    cost: 450,
    sustainability: {
      score: 95,
      factors: ['Renewable resource', 'Carbon negative', 'Biodegradable'],
    },
  },
  {
    id: '3',
    name: 'High-Performance Concrete',
    category: 'Composites',
    description: 'Advanced concrete with enhanced durability and strength',
    properties: [
      { name: 'Compressive Strength', value: 80, unit: 'MPa' },
      { name: 'Density', value: 2.4, unit: 'g/cm³' },
      { name: 'Water Absorption', value: 2, unit: '%' },
    ],
    useCases: ['Foundations', 'High-rise buildings', 'Infrastructure'],
    cost: 120,
    sustainability: {
      score: 60,
      factors: ['Long lifespan', 'Local sourcing possible', 'High embodied energy'],
    },
  },
];

export const materialService = {
  async getAllMaterials(): Promise<Material[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockMaterials;
  },

  async getMaterialById(id: string): Promise<Material | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockMaterials.find(material => material.id === id) || null;
  },

  async getMaterialsByCategory(category: string): Promise<Material[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockMaterials.filter(material => material.category === category);
  },
};