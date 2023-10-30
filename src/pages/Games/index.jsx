import { useMutation, useQuery } from "@apollo/client";
import { useRecoilState, useRecoilValue } from "recoil";
import { Controller, useForm } from "react-hook-form";

import Card from "common/components/card/index.jsx";
import Loader from "common/components/loader/index.jsx";

import { isLoggedInState, userRoleState } from "@atoms/user/index.js";
import { showAddGameFormState } from "@atoms/game/index.js";

import { GET_GAMES } from "query/get-games/index.js";
import { ADD_GAME } from "@mutations/add-game/index.js";

function Games() {
  const currentLoggedInState = useRecoilValue(isLoggedInState);
  const userRole = useRecoilValue(userRoleState);
  const [showAddGameForm, setShowAddGameForm] =
    useRecoilState(showAddGameFormState);

  const { loading, error, data: { games } = {} } = useQuery(GET_GAMES);
  const [
    addGame,
    { data: addedGameData, loading: loadingAddGame, error: addGameError },
  ] = useMutation(ADD_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset: resetGameInputs,
  } = useForm({
    defaultValues: {
      title: "",
      releaseYear: "",
      companyId: "",
    },
  });
  const onSubmitAddGame = async (data) => {
    try {
      let companyId = null;
      if (data.companyId) companyId = data.companyId;
      const result = await addGame({
        variables: {
          title: data.title,
          releaseYear: parseInt(data.releaseYear),
          companyId,
        },
      });
      resetGameInputs({ title: "", releaseYear: "", companyId: "" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading && <Loader height={`calc(100dvh-56px)`} />}
      {!loading && (
        <>
          <div className={`grid grid-cols-2 gap-4 p-4 lg:grid-cols-3`}>
            {games?.map((game) => (
              <Card key={game.id}>
                <h1
                  className={`text-2xl font-extrabold uppercase  md:text-4xl`}
                >
                  {game.title}
                </h1>
                <h2 className={`flex flex-col items-center justify-between`}>
                  <span className={`my-2 border-b-2 border-black font-bold`}>
                    RELEASE YEAR
                  </span>
                  <span>{game.releaseYear}</span>
                </h2>
              </Card>
            ))}
          </div>
          {userRole === "OWNER" && !showAddGameForm && (
            <div className={`flex justify-center`}>
              <button
                className={`my-4 rounded-md bg-amber-400 p-4`}
                onClick={() => setShowAddGameForm(!showAddGameForm)}
              >
                Add A Game
              </button>
            </div>
          )}
          {userRole === "OWNER" && showAddGameForm && (
            <Card className={`m-auto my-4 w-[400px]`}>
              <form
                onSubmit={handleSubmit(onSubmitAddGame)}
                className={`flex w-80 flex-col gap-2`}
              >
                <label>Title</label>
                <Controller
                  name={`title`}
                  control={control}
                  rules={{ required: "Input the title" }}
                  render={({ field }) => {
                    return (
                      <input
                        className={`p-1`}
                        placeholder={`Title`}
                        {...field}
                      />
                    );
                  }}
                />
                {errors.title && (
                  <p className={`text-red-500`}>{errors.title.message}</p>
                )}
                <label>Release Year</label>
                <Controller
                  name={`releaseYear`}
                  control={control}
                  rules={{
                    required: "Input the release year",
                    validate: (value) => {
                      let year = parseInt(value, 10);
                      return year >= 2000 && year <= 2024;
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <input
                        className={`p-1`}
                        placeholder={`Release year`}
                        type={`number`}
                        {...field}
                      />
                      {fieldState.invalid && (
                        <p className={`text-red-500`}>
                          Enter a year [2000-2024]
                        </p>
                      )}
                    </>
                  )}
                />
                {errors.releaseYear && (
                  <p className={`text-red-500`}>{errors.releaseYear.message}</p>
                )}
                <label>CompanyId</label>
                <Controller
                  name={`companyId`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <input
                        className={`p-1`}
                        placeholder={`companyId`}
                        {...field}
                      />
                    );
                  }}
                />
                {errors.companyId && (
                  <p className={`text-red-500`}>{errors.companyId.message}</p>
                )}
                <button
                  type={"submit"}
                  className={`m-auto mt-10 w-36 rounded-md bg-black p-2 text-white`}
                >
                  Add the game
                </button>
              </form>
            </Card>
          )}
        </>
      )}
    </>
  );
}
export default Games;
