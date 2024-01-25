import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import autoAnimate from "@formkit/auto-animate";
import { fetchRecipies } from "../services/recipes";
import { v4 as uuidv4 } from "uuid";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

// const TEST = "http://localhost:8080/test";
// const URL_SPOONACULAR = "https://api.spoonacular.com/recipes/findByIngredients";
// const API_KEY = "a901d0aa40234866995b3929da51e13d";

type Inputs = {
  firstIngridient: string;
  secondIngridient: string;
};

type FetchedDataProp = {
  recipeInfo?: FetchedData;
};

type FetchedData = {
  title: string;
  image: string;
  steps: string[];
  ingredients: string[];
  photo: string;
};
// type Steps = {
//   steps: Step[];
// };
// type Step = {
//   step: string;
// };

export const RecipesPreview = ({ recipeInfo }: FetchedDataProp) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {/* Recipe title and photo update */}
      <div className="relative h-fit max-h-96 max-w-screen-2xl lg:h-recipeFrontTab lg:max-h-full lg:w-7/12 lg:px-0 ">
        {recipeInfo == undefined ? (
          <img
            src="/foodImg_003.jpg"
            alt=""
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <img
            src={`${recipeInfo?.photo}`}
            alt=""
            className="h-full w-full rounded-2xl object-cover"
          />
        )}
        <div className="absolute bottom-0 h-40 w-full rounded-b-2xl bg-gradient-to-t from-black/70 from-40% via-black/60 via-70% to-transparent to-100% pt-20 duration-300 hover:h-56 hover:pt-24 lg:h-48">
          <div
            onClick={openModal}
            className="flex cursor-pointer flex-col gap-3 px-8 text-left tracking-tighter"
          >
            {recipeInfo == undefined ? (
              <section>
                <p className="font-Poppins text-3xl lg:text-5xl">
                  Its pizza time
                </p>
                <p className="font-Raleway text-xl lg:text-2xl">
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

      {/* Recipe screen popping out on title click code part */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75" />
          </Transition.Child>

          <div className="fixed inset-0 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-12 text-center font-Poppins text-4xl font-bold uppercase leading-6 text-gray-900"
                  >
                    {recipeInfo == undefined ? (
                      <p className="py-2">Title will be here</p>
                    ) : (
                      <p className="py-2">{recipeInfo?.title}</p>
                    )}
                  </Dialog.Title>
                  <div className="mt-2 flex flex-row gap-5 font-sans text-lg text-black">
                    <div className="w-7/12">
                      <span className="text-2xl font-bold uppercase">
                        How to make this recipe:
                      </span>
                      {recipeInfo == undefined ? (
                        <p>nera info</p>
                      ) : (
                        recipeInfo?.steps.map((item, index) => {
                          return (
                            <p
                              className="my-4 font-Raleway font-medium"
                              key={uuidv4()}
                            >
                              <span className="text-xl font-bold">
                                {index + 1}.{" "}
                              </span>
                              {item}
                            </p>
                          );
                        })
                      )}
                    </div>
                    <div className="flex w-5/12 flex-col gap-4">
                      {recipeInfo == undefined ? (
                        <img
                          src="/foodImg_003.jpg"
                          alt=""
                          className="h-80 w-full rounded-2xl object-cover"
                        />
                      ) : (
                        <img
                          src={`${recipeInfo?.photo}`}
                          alt=""
                          className="h-80 w-full rounded-2xl object-cover"
                        />
                      )}
                      <div>
                        <span className="text-2xl font-bold uppercase">
                          Ingredients:
                        </span>
                        {recipeInfo == undefined ? (
                          <p>nera info</p>
                        ) : (
                          recipeInfo?.ingredients.map((item) => {
                            return (
                              <div className="flex items-center justify-start text-center font-Raleway text-lg">
                                <img
                                  src="/CicrleDot.png"
                                  alt=""
                                  className="mr-2 mt-0.5 w-1.5 text-center"
                                />

                                <p className="font-medium" key={uuidv4()}>
                                  {item}
                                </p>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const RecipesForm = () => {
  const [val, setVal] = useState<string[]>(["beef"]);

  const [fetchedData, setFetchedData] = useState<FetchedData>();

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
      const recipe = await fetchRecipies(val);
      // console.log(recipe);
      setFetchedData(recipe);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="my-14 flex w-full max-w-xl flex-col gap-10 bg-backgroundColor-0 lg:max-w-5xl lg:flex-row lg:justify-between">
      {fetchedData != undefined ? (
        <RecipesPreview recipeInfo={fetchedData} />
      ) : (
        <RecipesPreview />
      )}

      <div className="w-full lg:w-5/12 lg:px-0">
        <div className="rounded-md border-mainColor-0 border-opacity-50 font-sans text-foregroundColor-0/90 duration-300 hover:border-opacity-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className=" rounded-2xl rounded-b-none border-2 border-mainColor-0 py-10 text-5xl font-bold leading-5 tracking-tighter md:py-6 lg:text-5xl">
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
                          className="w-full bg-backgroundColor-0/5 px-3 py-2 text-3xl text-foregroundColor-0
                           placeholder:text-2xl placeholder:font-extralight placeholder:text-foregroundColor-0/40 lg:py-1"
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
                    className=" my-10 rounded-md border border-foregroundColor-0/70 px-6 py-2
                     font-Raleway text-2xl font-normal text-foregroundColor-0 duration-300
                    hover:border-mainColor-0/60 lg:my-6 lg:px-4 lg:py-1 lg:text-xl "
                    onClick={() => handleAdd()}
                  >
                    Add more ingredients
                  </button>
                ) : null}
              </div>
            </div>
            <div>
              <button
                className="w-full rounded-2xl rounded-t-none border-t-2 border-mainColor-0
                 py-12 text-4xl font-bold text-foregroundColor-0/90 duration-100
                hover:bg-mainColor-0/80 active:bg-mainColor-0/50 lg:py-8"
                type="submit"
              >
                Show Me Some
              </button>
            </div>
          </form>
          <div>
            {fetchedData != undefined ? (
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
