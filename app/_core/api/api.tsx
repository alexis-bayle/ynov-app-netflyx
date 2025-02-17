export const apiUrl = 'https://api.themoviedb.org/3';
const Authorization =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzdmN2E5MTc5NTY5YTNmZTBiODE4YmRiNDU5OWZmYiIsIm5iZiI6MTczOTc5MTQ4Ni4xMzc5OTk4LCJzdWIiOiI2N2IzMWM3ZTE2OWUzNjVhZjY5ZmNjNzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xSU1iTGzsfrK9vFa_Z_jXOy759txxJuF3MTqFaicbQE';

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
