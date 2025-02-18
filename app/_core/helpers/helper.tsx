export const imageUrl = 'https://image.tmdb.org/t/p/original/';

export function getStarRating(rating: number, maxStars = 5) {
  rating = rating / 2; // Divide by 2 to get 5 star rating
  let fullStars = Math.floor(rating);
  let halfStar = rating % 1 >= 0.5 ? 1 : 0;
  let emptyStars = maxStars - fullStars - halfStar;

  let stars = [];

  for (let i = 0; i < fullStars; i++) stars.push('★');
  if (halfStar) stars.push('✬');
  for (let i = 0; i < emptyStars; i++) stars.push('☆');

  return stars.join('');
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
