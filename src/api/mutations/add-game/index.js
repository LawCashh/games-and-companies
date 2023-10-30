import { gql } from "@apollo/client";

export const ADD_GAME = gql`
  mutation ($title: String!, $releaseYear: Int!, $companyId: String) {
    addGame(title: $title, releaseYear: $releaseYear, companyId: $companyId) {
      title
      releaseYear
    }
  }
`;
