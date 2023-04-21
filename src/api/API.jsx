import axios from 'axios';
const instanse = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '34224425-7bb348d9149d57202c2c3a13e',
    per_page: 12,
  },
});
export const searchImages = async (q, page = 1) => {
  const { data } = await instanse.get('/', { params: { q, page } });
  return data;
};
