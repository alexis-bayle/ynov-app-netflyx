import ApiService, { apiUrl } from '../api/api';
import { Movie } from '../interface/movieInterface';

export class MovieService {
  private static api = new ApiService();

  static async getMovieDetails(movieId: number): Promise<Movie> {
    return this.api
      .get(`${apiUrl}/movie/${movieId}?language=en-US`)
      .then((res: any) => res.json())
      .then((data: Movie) => {
        return data;
      });
  }
}
