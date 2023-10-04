import { gql } from '@apollo/client';

const TaskFragment = gql`
  fragment Task on Task {
    updatedAt
    title
    isCompleted
    id
    description
    createdAt
    dueAt
    completedAt
    categoryId
    category {
      data {
        id
        name
        ordering
        updatedAt
        createdAt
      }
    }
  }
`;

const TaskCompletedFragment = gql`
  fragment TaskCompleted on Task {
    id
    title
    isCompleted
    dueAt
    description
    createdAt
    completedAt
    categoryId
    category {
      data {
        createdAt
        description
        name
        updatedAt
        ordering
        id
      }
    }
    updatedAt
    activity {
      data {
        action
        after
        before
        createdAt
        description
        id
        updatedAt
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

export const OrderedTasksByCategory = gql`
  query OrderedTasksByCategory {
    orderedTasksByCategory {
      pagination {
        totalItems
      }
      data {
        ...Task
      }
    }
  }
`;

export const FindUniqueTask = gql`
  query FindUniqueTask($taskId: UUID!) {
    findUniqueTask(id: $taskId) {
      data {
        ...TaskCompleted
      }
    }
  }
  ${TaskCompletedFragment}
`;
