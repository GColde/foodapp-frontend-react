import axios from "axios";

const URL = "http://localhost:8080/recipeinfo";

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
