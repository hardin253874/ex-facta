import { useState, useEffect } from 'react';
import { Material } from '@/types';
import { materialService } from '@/services/materialService';

export const useMaterials = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const data = await materialService.getAllMaterials();
        setMaterials(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch materials');
        console.error('Error fetching materials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  return { materials, loading, error };
};