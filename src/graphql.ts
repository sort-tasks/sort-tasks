import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  UUID: { input: string; output: string; }
};

export type AuthLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AuthLoginResult = {
  __typename?: 'AuthLoginResult';
  token: Scalars['String']['output'];
  user: User;
};

export type AuthRegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime']['output'];
  id?: Maybe<Scalars['UUID']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryCreateInput = {
  name: Scalars['String']['input'];
};

export type CategoryListResult = {
  __typename?: 'CategoryListResult';
  data?: Maybe<Array<Maybe<Category>>>;
  pagination?: Maybe<Pagination>;
};

export type CategorySingleResult = {
  __typename?: 'CategorySingleResult';
  data?: Maybe<Category>;
};

export type CategoryUpdateInput = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authLogin?: Maybe<AuthLoginResult>;
  authRegister?: Maybe<Scalars['String']['output']>;
  categoryCreate: Category;
  taskCreate: Task;
  taskDelete: Task;
  taskUpdate: Task;
};


export type MutationAuthLoginArgs = {
  input: AuthLoginInput;
};


export type MutationAuthRegisterArgs = {
  input: AuthRegisterInput;
};


export type MutationCategoryCreateArgs = {
  input: CategoryCreateInput;
};


export type MutationTaskCreateArgs = {
  input: TaskCreateInput;
};


export type MutationTaskDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type MutationTaskUpdateArgs = {
  id: Scalars['UUID']['input'];
  input: TaskUpdateInput;
};

export type Pagination = {
  __typename?: 'Pagination';
  totalItems?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findManyCategory: CategoryListResult;
  findManyTask: TaskListResult;
  me?: Maybe<User>;
};


export type QueryFindManyCategoryArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindManyTaskArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Task = {
  __typename?: 'Task';
  category?: Maybe<CategorySingleResult>;
  categoryId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  isCompleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskCreateInput = {
  categoryId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type TaskListResult = {
  __typename?: 'TaskListResult';
  data?: Maybe<Array<Maybe<Task>>>;
  pagination?: Maybe<Pagination>;
};

export type TaskUpdateInput = {
  categoryId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  categories?: Maybe<CategoryListResult>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id?: Maybe<Scalars['UUID']['output']>;
  lastName: Scalars['String']['output'];
  tasks?: Maybe<TaskListResult>;
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  input: AuthLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', authLogin?: { __typename?: 'AuthLoginResult', token: string, user: { __typename?: 'User', id?: string | null } } | null };


export const LoginDocument = gql`
    mutation Login($input: AuthLoginInput!) {
  authLogin(input: $input) {
    token
    user {
      id
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;