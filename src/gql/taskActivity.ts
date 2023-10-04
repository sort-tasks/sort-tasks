import { gql } from '@apollo/client';

export const TaskActivityCreate = gql`
  mutation TaskActivityCreate($input: TaskActivityCreateInput!) {
    taskActivityCreate(input: $input) {
      action
      after
      before
      createdAt
      description
      id
      updatedAt
    }
  }
`;
