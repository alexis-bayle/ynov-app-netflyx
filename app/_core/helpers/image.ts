import { Image, ScaledSize } from 'react-native';

export const prefetchImages = async (imageUrl: string, poster_path: string | undefined) => {
  return Image.prefetch(imageUrl + poster_path);
};

export const getSize = (win: ScaledSize, imageUrl: string, poster_path: string | undefined) => {
  let result = win.height * 0.6;
  if (poster_path === null) {
    Image.getSize(imageUrl + poster_path, (width, height) => {
      const aspectRatio = height / width;
      result = win.width * aspectRatio;
    });
  }
  return result;
};
