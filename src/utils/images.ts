import { Asset } from 'expo-asset';

export const userImages: { [key: string]: any } = {
  giacomo_gugu: require("../../assets/img/profile/giacomo_gugu.png"),
  alice_gugu: require("../../assets/img/profile/alice_gugu.png"),
  lorenzo_gugu: require("../../assets/img/profile/lorenzo_gugu.png"),
  francesca_gugu: require("../../assets/img/profile/francesca_gugu.png"),
};

export const filtersImages: {[key: string]: any} = {
  typeOfMeal: require("../../assets/fork_knife.png"),
  foodRestrictions: require("../../assets/favorite.png"),
  priceRange: require("../../assets/priceRange.png"),
  distance: require("../../assets/distance.png"),
  specialExperience: require("../../assets/special_experience.png"),
  openNow: require("../../assets/open_now.png")
}

export const preloadImages = async () => {
  const userImageAssets = Object.values(userImages).map(image =>
    Asset.fromModule(image).downloadAsync()
  );

  const filterImageAssets = Object.values(filtersImages).map(image =>
    Asset.fromModule(image).downloadAsync()
  );

  // Precarica tutte le immagini insieme
  await Promise.all([...userImageAssets, ...filterImageAssets]);
};