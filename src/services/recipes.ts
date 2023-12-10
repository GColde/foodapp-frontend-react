import axios from "axios";

const URL = "http://localhost:8080/recipeinfo";
const URL_PHOTO = "http://localhost:8080/recipephoto";

export const fetchRecipies = async (val: string[]) => {
  try {
    const recepiesOwnApi = await axios.get(URL, {
      params: {
        ingredients: `${val.join(",")}`,
      },
    });
    const data = recepiesOwnApi.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecipiesPhotos = async (title: string) => {
  try {
    const response = await await axios.get(URL_PHOTO, {
      params: {
        photo: `${title}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
