import { gql } from '@apollo/client';

const CategoryFragment = gql`
  fragment Category on Category {
    createdAt
    id
    name
    ordering
    updatedAt
  }
`;

export const FindManyCategory = gql`
  query FindManyCategory {
    findManyCategory {
      pagination {
        totalItems
      }
      data {
        ...Category
      }
    }
  }
  ${CategoryFragment}
`;
