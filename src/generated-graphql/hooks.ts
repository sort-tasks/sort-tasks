import * as Types from './types.ts';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  createdAt
  id
  name
  ordering
  updatedAt
}
    `;
export const TaskFragmentDoc = gql`
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
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.MeQuery, Types.MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.MeQuery, Types.MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<Types.MeQuery, Types.MeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: AuthLoginInput!) {
  authLogin(input: $input) {
    token
    user {
      id
      firstName
      lastName
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<Types.LoginMutation, Types.LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<Types.LoginMutation, Types.LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LoginMutation, Types.LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<Types.LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<Types.LoginMutation, Types.LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: AuthRegisterInput!) {
  authRegister(input: $input)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<Types.RegisterMutation, Types.RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<Types.RegisterMutation, Types.RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RegisterMutation, Types.RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<Types.RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<Types.RegisterMutation, Types.RegisterMutationVariables>;
export const FindManyCategoryDocument = gql`
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
    ${CategoryFragmentDoc}`;

/**
 * __useFindManyCategoryQuery__
 *
 * To run a query within a React component, call `useFindManyCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindManyCategoryQuery(baseOptions?: Apollo.QueryHookOptions<Types.FindManyCategoryQuery, Types.FindManyCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.FindManyCategoryQuery, Types.FindManyCategoryQueryVariables>(FindManyCategoryDocument, options);
      }
export function useFindManyCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.FindManyCategoryQuery, Types.FindManyCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.FindManyCategoryQuery, Types.FindManyCategoryQueryVariables>(FindManyCategoryDocument, options);
        }
export type FindManyCategoryQueryHookResult = ReturnType<typeof useFindManyCategoryQuery>;
export type FindManyCategoryLazyQueryHookResult = ReturnType<typeof useFindManyCategoryLazyQuery>;
export type FindManyCategoryQueryResult = Apollo.QueryResult<Types.FindManyCategoryQuery, Types.FindManyCategoryQueryVariables>;
export const FindManyTaskDocument = gql`
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
    ${TaskFragmentDoc}`;

/**
 * __useFindManyTaskQuery__
 *
 * To run a query within a React component, call `useFindManyTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindManyTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindManyTaskQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindManyTaskQuery(baseOptions?: Apollo.QueryHookOptions<Types.FindManyTaskQuery, Types.FindManyTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.FindManyTaskQuery, Types.FindManyTaskQueryVariables>(FindManyTaskDocument, options);
      }
export function useFindManyTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.FindManyTaskQuery, Types.FindManyTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.FindManyTaskQuery, Types.FindManyTaskQueryVariables>(FindManyTaskDocument, options);
        }
export type FindManyTaskQueryHookResult = ReturnType<typeof useFindManyTaskQuery>;
export type FindManyTaskLazyQueryHookResult = ReturnType<typeof useFindManyTaskLazyQuery>;
export type FindManyTaskQueryResult = Apollo.QueryResult<Types.FindManyTaskQuery, Types.FindManyTaskQueryVariables>;
export const TaskCreateDocument = gql`
    mutation TaskCreate($input: TaskCreateInput!) {
  taskCreate(input: $input) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type TaskCreateMutationFn = Apollo.MutationFunction<Types.TaskCreateMutation, Types.TaskCreateMutationVariables>;

/**
 * __useTaskCreateMutation__
 *
 * To run a mutation, you first call `useTaskCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskCreateMutation, { data, loading, error }] = useTaskCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTaskCreateMutation(baseOptions?: Apollo.MutationHookOptions<Types.TaskCreateMutation, Types.TaskCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.TaskCreateMutation, Types.TaskCreateMutationVariables>(TaskCreateDocument, options);
      }
export type TaskCreateMutationHookResult = ReturnType<typeof useTaskCreateMutation>;
export type TaskCreateMutationResult = Apollo.MutationResult<Types.TaskCreateMutation>;
export type TaskCreateMutationOptions = Apollo.BaseMutationOptions<Types.TaskCreateMutation, Types.TaskCreateMutationVariables>;
export const TaskUpdateDocument = gql`
    mutation TaskUpdate($taskId: UUID!, $input: TaskUpdateInput!) {
  taskUpdate(id: $taskId, input: $input) {
    ...Task
  }
}
    ${TaskFragmentDoc}`;
export type TaskUpdateMutationFn = Apollo.MutationFunction<Types.TaskUpdateMutation, Types.TaskUpdateMutationVariables>;

/**
 * __useTaskUpdateMutation__
 *
 * To run a mutation, you first call `useTaskUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaskUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taskUpdateMutation, { data, loading, error }] = useTaskUpdateMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTaskUpdateMutation(baseOptions?: Apollo.MutationHookOptions<Types.TaskUpdateMutation, Types.TaskUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.TaskUpdateMutation, Types.TaskUpdateMutationVariables>(TaskUpdateDocument, options);
      }
export type TaskUpdateMutationHookResult = ReturnType<typeof useTaskUpdateMutation>;
export type TaskUpdateMutationResult = Apollo.MutationResult<Types.TaskUpdateMutation>;
export type TaskUpdateMutationOptions = Apollo.BaseMutationOptions<Types.TaskUpdateMutation, Types.TaskUpdateMutationVariables>;
export const OrderedTasksByCategoryDocument = gql`
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
    ${TaskFragmentDoc}`;

/**
 * __useOrderedTasksByCategoryQuery__
 *
 * To run a query within a React component, call `useOrderedTasksByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderedTasksByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderedTasksByCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrderedTasksByCategoryQuery(baseOptions?: Apollo.QueryHookOptions<Types.OrderedTasksByCategoryQuery, Types.OrderedTasksByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OrderedTasksByCategoryQuery, Types.OrderedTasksByCategoryQueryVariables>(OrderedTasksByCategoryDocument, options);
      }
export function useOrderedTasksByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OrderedTasksByCategoryQuery, Types.OrderedTasksByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OrderedTasksByCategoryQuery, Types.OrderedTasksByCategoryQueryVariables>(OrderedTasksByCategoryDocument, options);
        }
export type OrderedTasksByCategoryQueryHookResult = ReturnType<typeof useOrderedTasksByCategoryQuery>;
export type OrderedTasksByCategoryLazyQueryHookResult = ReturnType<typeof useOrderedTasksByCategoryLazyQuery>;
export type OrderedTasksByCategoryQueryResult = Apollo.QueryResult<Types.OrderedTasksByCategoryQuery, Types.OrderedTasksByCategoryQueryVariables>;