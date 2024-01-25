import RecipesForm from "../components/RecipesForm";

const MainPage = () => {
  return (
    <section className="flex flex-col justify-center bg-backgroundColor-0 ">
      <div className="mb-3 flex w-full cursor-default flex-col px-6 lg:px-24 xl:px-48 2xl:px-96">
        <div
          className="relative mx-auto flex cursor-default flex-col pt-36 font-Poppins 
        text-7xl font-bold uppercase tracking-tighter text-foregroundColor-0 lg:text-8xl"
        >
          <img
            className="absolute left-0 top-24 z-0 scale-100 rounded-full opacity-70 brightness-90 duration-500 
            hover:scale-110 hover:brightness-100 md:top-2 md:scale-100 md:opacity-100 lg:left-32 lg:top-10 xl:left-1/4 xl:top-7 2xl:left-2/4"
            src="foodImg_001.png"
            alt="food image"
            width={700}
          />
          <span className="z-10 w-fit">What</span>
          <span className="z-10 w-fit">Should I</span>
          <span className="z-10 w-fit">Eat today?</span>
        </div>
        <div className="mx-auto flex w-5/6 flex-col pt-32 text-center font-Raleway text-3xl font-semibold leading-10 tracking-tight text-mainColor-0 lg:w-5/6 lg:text-3xl ">
          <h1>Project made for you to find you perfect recepie for the day!</h1>
        </div>
        <img
          className="mx-auto my-2 hidden animate-pulse brightness-150 duration-100 md:block"
          width={50}
          src="ArrowsDown.png"
          alt="arrow down"
        />
      </div>

      <div className="flex flex-col justify-center px-5 text-center font-sans text-3xl font-semibold leading-10 tracking-tight text-foregroundColor-0 sm:items-center md:px-0 lg:text-3xl">
        <h1>
          Basically just write what you have in your fridge and I will come up
          with something
        </h1>
        <RecipesForm />
      </div>
    </section>
  );
};

export default MainPage;
