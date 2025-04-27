  

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useApi(endPoint, params = {}) {
  return useQuery({
    queryKey: [endPoint, params],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`, { params }),

  });
}
