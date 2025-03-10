export const apiUrl = 'https://api.themoviedb.org/3';
const Authorization = `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`;

export default class ApiService {
  get(url: string) {
    return fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization,
      },
    });
  }

  post(url: string, data: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization,
      },
      body: JSON.stringify(data),
    });
  }

  remove(url: string) {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        Authorization,
      },
    });
  }
}
