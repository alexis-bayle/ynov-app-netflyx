import ApiService, { apiUrl } from '../api/api';
import { Movie } from '../interface/movieInterface';

export class MovieService {
  private static readonly api = new ApiService();

  static async getMovieDetails(movieId: number): Promise<Movie> {
    return this.api
      .get(`${apiUrl}/movie/${movieId}?language=en-US`)
      .then((res: any) => res.json())
      .then((data: Movie) => {
        return data;
      });
  }

  static async getRecommendedMoviesByMovieId(movieId: number): Promise<any> {
    return this.api
      .get(`${apiUrl}/movie/${movieId}/recommendations?language=en-US`)
      .then((res: any) => res.json())
      .then((data: any) => {
        return data;
      });
  }

  static async getPopulardMovies(): Promise<any> { //TODO: Implement interface
    return this.api
      .get(`${apiUrl}/movie/popular?language=en-US`)
      .then((res: any) => res.json())
      .then((data: any) => {
        return data;
      });
  }

  static async getNewMovies(): Promise<any> { //TODO: Implement interface
    return this.api
      .get(`${apiUrl}/movie/now_playing?language=en-US`)
      .then((res: any) => res.json())
      .then((data: any) => {
        return data;
      });
  }
}

