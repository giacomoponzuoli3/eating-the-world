import { Asset } from 'expo-asset';

export const userImages: { [key: string]: any } = {
  giacomo_gugu: require("../../assets/img/profile/giacomo_gugu.png"),
  alice_gugu: require("../../assets/img/profile/alice_gugu.png"),
  lorenzo_gugu: require("../../assets/img/profile/lorenzo_gugu.png"),
  francesca_gugu: require("../../assets/img/profile/francesca_gugu.png"),
};

export const preloadImages = async () => {
  const imageAssets = Object.values(userImages).map(image => Asset.fromModule(image).downloadAsync());
  await Promise.all(imageAssets);
};