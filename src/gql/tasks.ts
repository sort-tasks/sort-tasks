import { gql } from '@apollo/client';

const TaskFragment = gql`
  fragment Task on Task {
    updatedAt
    name
    isCompleted
    id
    description
    createdAt
    categoryId
    category {
      data {
        id
        name
        updatedAt
        createdAt
      }
    }
  }
`;

export const FindManyTasks = gql`
  query FindManyTask {
    findManyTask {
      pagination {
        totalItems
      }
      data {
        ...Task
      }
    }
  }
  ${TaskFragment}
`;

export const TaskCreate = gql`
  mutation TaskCreate($input: TaskCreateInput!) {
    taskCreate(input: $input) {
      ...Task
    }
  }
`;

export const TaskUpdate = gql`
  mutation TaskUpdate($taskId: UUID!, $input: TaskUpdateInput!) {
    taskUpdate(id: $taskId, input: $input) {
      ...Task
    }
  }
`;
