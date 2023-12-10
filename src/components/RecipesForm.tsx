import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import autoAnimate from "@formkit/auto-animate";
import { fetchRecipies, fetchRecipiesPhotos } from "../services/recipes";

// const TEST = "http://localhost:8080/test";
// const URL_SPOONACULAR = "https://api.spoonacular.com/recipes/findByIngredients";
// const API_KEY = "a901d0aa40234866995b3929da51e13d";

type Inputs = {
  firstIngridient: string;
  secondIngridient: string;
};
type FetchedDataProp = {
  recipeInfo?: FetchedData;
  recipePhoto?: string;
};

type FetchedData = {
  title: string;
  image: string;
  analyzedInstructions: Steps[];
  steps: string[];
};
type Steps = {
  steps: Step[];
};
type Step = {
  number: string;
  step: string;
};

export const RecipesPreview = ({
  recipeInfo,
  recipePhoto,
}: FetchedDataProp) => {
  return (
    <div className="relative h-fit w-full lg:h-recipeFrontTab lg:w-3/5 lg:px-0 ">
      {recipePhoto == undefined ? (
        <img
          src="/foodImg_003.jpg"
          alt=""
          className="h-full w-full rounded-2xl object-cover"
        />
      ) : (
        <img
          src={`${recipePhoto}`}
          alt=""
          className="h-full w-full rounded-2xl object-cover"
        />
      )}
      <div className="absolute bottom-0 h-48 w-full rounded-b-2xl bg-gradient-to-t from-black/70 from-40% via-black/60 via-70% to-transparent to-100% pt-20 duration-300 hover:h-56 hover:pt-24">
        <div
          onClick={() => {
            console.log("Poppinu ekrana");
          }}
          className="flex cursor-pointer flex-col gap-3 px-8 text-left tracking-tighter"
        >
          {recipeInfo == undefined ? (
            <section>
              <p className="font-Poppins text-5xl">Its pizza time</p>
              <p className="font-Raleway text-2xl">
                Read about it more here...
              </p>
            </section>
          ) : (
            <section>
              <p className="font-Poppins text-5xl"> {recipeInfo.title}</p>
              <p className="font-Raleway text-2xl">
                Read about it more here...
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const RecipesForm = () => {
  const [val, setVal] = useState<string[]>(["beef"]);

  const [fetchedData, setFetchedData] = useState<FetchedData>();
  const [fetchedPhoto, setFetchedPhoto] = useState<string>();

  const { handleSubmit } = useForm<Inputs>();

  const parent = useRef(null);

  const handleAdd = () => {
    const currentInput = [...val, ""];
    setVal(currentInput);
  };

  const handleChange = (
    onChangeValue: ChangeEvent<HTMLInputElement>,
    i: number,
  ) => {
    const inputdata = [...val];
    inputdata[i] = onChangeValue.target.value;
    setVal(inputdata);
    console.log(val);
  };
  const handleDelete = (i: number) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setVal(deleteVal);
  };

  const onSubmit: SubmitHandler<Inputs> = async () => {
    try {
      //--------------------- Spponacular API ---------------------
      // const recepiesRes = await axios.get(URL_SPOONACULAR, {
      //   params: {
      //     ingredients: `${val.join(",")}`,
      //     number: 1,
      //     sort: "min-missing-ingredients",
      //     apiKey: API_KEY,
      //   },
      // });
      // const recepiesInfo = await axios.get(
      //   `https://api.spoonacular.com/recipes/${recepiesRes.data[0].id}/information`,
      //   {
      //     params: {
      //       apiKey: API_KEY,
      //       includeNutrition: true,
      //     },
      //   },
      // );
      // setFetchedData(recepiesInfo.data);
      // console.log(recepiesInfo.data);
      //--------------------- Spponacular API ---------------------

      const recipe = await fetchRecipies(val);
      const photo = await fetchRecipiesPhotos(recipe.title);
      // console.log(recipe);
      console.log(photo);
      setFetchedData(recipe);
      setFetchedPhoto(photo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="my-14 flex flex-col gap-20 bg-backgroundColor-0 align-middle lg:flex-row lg:justify-between">
      {fetchedData != undefined ? (
        <RecipesPreview recipeInfo={fetchedData} recipePhoto={fetchedPhoto} />
      ) : (
        <RecipesPreview />
      )}

      <div className="w-full lg:w-2/5 lg:px-0">
        <div className="rounded-md border-mainColor-0 border-opacity-50 font-sans text-foregroundColor-0/90 duration-300 hover:border-opacity-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className=" rounded-2xl rounded-b-none border-2 border-mainColor-0 py-12 text-5xl font-bold leading-5 tracking-tighter lg:text-6xl">
              Recipe Maker
            </h3>
            <div className="px-8">
              <div className="flex">
                <p className="mb-8 mt-8 font-Raleway text-3xl font-normal lg:mb-2 lg:text-2xl">
                  In my fridge I have:
                </p>
              </div>
              <div className="flex flex-col font-Raleway font-normal">
                <ul ref={parent}>
                  {val.map((data, i) => {
                    return (
                      <li className="mb-5 flex flex-row">
                        <input
                          className="w-full bg-backgroundColor-0/5 px-3 py-2 text-3xl text-foregroundColor-0 placeholder:text-2xl placeholder:font-extralight placeholder:text-foregroundColor-0/40 lg:py-1"
                          placeholder="type ingridient here..."
                          value={data}
                          onChange={(e) => handleChange(e, i)}
                        />
                        {val.length > 1 ? (
                          <button
                            type="button"
                            className="ml-2 max-w-sm cursor-crosshair px-4 text-4xl font-light"
                            onClick={() => handleDelete(i)}
                          >
                            x
                          </button>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                {val.length <= 4 ? (
                  <button
                    type="button"
                    className=" my-10 rounded-md border border-foregroundColor-0/70 px-6 py-2 font-Raleway text-2xl font-normal text-foregroundColor-0 duration-300 hover:border-mainColor-0/60 lg:my-6 lg:px-4 lg:py-1 lg:text-xl "
                    onClick={() => handleAdd()}
                  >
                    Add more ingredients
                  </button>
                ) : null}
              </div>
            </div>
            <div>
              <button
                className="w-full rounded-2xl rounded-t-none border-t-2 border-mainColor-0 py-12 text-4xl font-bold text-foregroundColor-0/90 duration-100 hover:bg-mainColor-0/80 active:bg-mainColor-0/50 lg:py-8"
                type="submit"
              >
                Show Me Some
              </button>
            </div>
          </form>
          <div>
            {fetchedData != undefined ? (
              // <div className="flex flex-col justify-center align-middle">
              //   <h1 className="text-center text-2xl font-bold">
              //     {fetchedData.title}
              //   </h1>
              //   <img
              //     className="m-auto rounded-md border-2 border-neutral-400"
              //     width={350}
              //     src={fetchedData.image}
              //     alt=""
              //   />
              //   <h1 className="mx-5 my-3 w-3/4 text-base font-semibold">
              //     {fetchedData.analyzedInstructions[0].steps.map((task) => {
              //       return (
              //         <h1>
              //           {task.number}. {task.step}
              //         </h1>
              //       );
              //     })}
              //   </h1>
              //   <h1 className="mx-5 my-3 w-3/4 text-base font-semibold">
              //     One portion: {fetchedData.nutrition.weightPerServing.amount}{" "}
              //     {fetchedData.nutrition.weightPerServing.unit}.
              //   </h1>
              //   <div className="flex flex-wrap gap-8 px-2 py-3">
              //     <div className="rounded-md px-2 py-2 text-center">
              //       <b>{fetchedData.nutrition.nutrients[0].name}:</b>{" "}
              //       {fetchedData.nutrition.nutrients[0].amount}{" "}
              //       {fetchedData.nutrition.nutrients[0].unit}.
              //     </div>
              //     <div className="rounded-md px-2 py-2 text-center">
              //       <b>{fetchedData.nutrition.nutrients[1].name}:</b>{" "}
              //       {fetchedData.nutrition.nutrients[1].amount}{" "}
              //       {fetchedData.nutrition.nutrients[1].unit}.
              //     </div>
              //     <div className="rounded-md px-2 py-2 text-center">
              //       <b>{fetchedData.nutrition.nutrients[5].name}:</b>{" "}
              //       {fetchedData.nutrition.nutrients[5].amount}{" "}
              //       {fetchedData.nutrition.nutrients[5].unit}.
              //     </div>
              //     <div className="rounded-md px-2 py-2 text-center">
              //       <b>{fetchedData.nutrition.nutrients[8].name}:</b>{" "}
              //       {fetchedData.nutrition.nutrients[8].amount}{" "}
              //       {fetchedData.nutrition.nutrients[8].unit}.
              //     </div>
              //   </div>
              // </div>

              <div className="flex flex-col justify-center align-middle">
                <h1 className="text-center text-2xl font-bold">
                  {fetchedData.title}
                </h1>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesForm;
