import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Authorization } from '@/features/auth';
import storage from '@/utils/storage';

const BaseURL = import.meta.env.VITE_API_URL;

export const getQuranSurah = async () => {
  const res = await axios.get(`${BaseURL}/quran-surah`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });

  return res.data.data;
};

export const useGetQuranSurah = () => {
  return useQuery({
    queryKey: ['surah'],
    queryFn: () => getQuranSurah(),
  });
};
