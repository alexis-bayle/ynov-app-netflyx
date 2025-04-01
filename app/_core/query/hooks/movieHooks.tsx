import { useQuery } from '@tanstack/react-query';
import { MovieService } from '../../service/movieService';

export const useGetMovieById = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => await MovieService.getMovieDetails(id),
  });
};

export const useGetRecommendedMoviesByMovieId = (id: number) => {
  return useQuery({
    queryKey: ['recommendedMovies', id],
    queryFn: async () => await MovieService.getRecommendedMoviesByMovieId(id),
  });
};

export const useGetCreditsByMovieId = (id: number) => {
  return useQuery({
    queryKey: ['credits', id],
    queryFn: async () => await MovieService.getMovieCreditsByMovieId(id),
  });
};

export const useGetMoviesBySearch = (search: string, page: number) => {
  return useQuery({
    queryKey: ['search', search, page],
    queryFn: async () => await MovieService.getMoviesBySearch(search, page),
  });
};

export const useGetNewMovies = () => {
  return useQuery({
    queryKey: ['newMovies'],
    queryFn: async () => await MovieService.getNewMovies(),
  });
};

export const useGetPopularMovies = () => {
  return useQuery({
    queryKey: ['popularMovies'],
    queryFn: async () => await MovieService.getPopulardMovies(),
  });
};
