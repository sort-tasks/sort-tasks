import { gql } from '@apollo/client';

export const FindManyCategory = gql`
  query FindManyCategory {
    findManyCategory {
      pagination {
        totalItems
      }
      data {
        createdAt
        id
        name
        updatedAt
      }
    }
  }
`;
