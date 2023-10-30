import { useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";

import Card from "common/components/card/index.jsx";
import Loader from "common/components/loader/index.jsx";

import { isLoggedInState } from "@atoms/user/index.js";

import { GET_COMPANIES } from "query/get-companies/index.js";

function Companies() {
  const currentLoggedInState = useRecoilValue(isLoggedInState);

  const { loading, error, data: { companies } = {} } = useQuery(GET_COMPANIES);

  return (
    <>
      {loading && <Loader height={`calc(100dvh-56px)`} />}
      {!loading && (
        <div className={`grid grid-cols-2 gap-4 p-4 lg:grid-cols-3`}>
          {companies?.map((company) => (
            <Card key={company.id}>
              <h1 className={`text-2xl font-extrabold uppercase  md:text-4xl`}>
                {company.title}
              </h1>
              <h2 className={`flex flex-col items-center justify-between`}>
                <span className={`my-0 border-b-2 border-black font-bold`}>
                  Number of Employees
                </span>
                <span>{company.numOfEmployees}</span>
              </h2>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
export default Companies;
