import { gql } from "@apollo/client";

export const GET_COMPANIES = gql`
  query getCompanies {
    companies {
      id
      title
      numOfEmployees
      games {
        title
        releaseYear
      }
    }
  }
`;
