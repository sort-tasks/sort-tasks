export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  ordering: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type CategoryListResult = {
  __typename?: 'CategoryListResult';
  data?: Maybe<Array<Category>>;
  pagination: Pagination;
};

export type CategorySingleResult = {
  __typename?: 'CategorySingleResult';
  data?: Maybe<Category>;
};

export type CategoryUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ordering: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authLogin?: Maybe<AuthLoginResult>;
  authRegister?: Maybe<Scalars['String']['output']>;
  categoryCreate: Category;
  taskActivityCreate: TaskActivity;
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


export type MutationTaskActivityCreateArgs = {
  input: TaskActivityCreateInput;
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
  findUniqueTask?: Maybe<TaskSingleResult>;
  me?: Maybe<User>;
  orderedTasksByCategory: TaskListResult;
};


export type QueryFindManyCategoryArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindManyTaskArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFindUniqueTaskArgs = {
  id: Scalars['UUID']['input'];
};

export type Task = {
  __typename?: 'Task';
  activity: TaskActivityListResult;
  category: CategorySingleResult;
  categoryId: Scalars['UUID']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  dueAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['UUID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskActivity = {
  __typename?: 'TaskActivity';
  action: Scalars['String']['output'];
  after?: Maybe<Scalars['String']['output']>;
  before?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaskActivityCreateInput = {
  action: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['UUID']['input'];
};

export type TaskActivityListResult = {
  __typename?: 'TaskActivityListResult';
  data?: Maybe<Array<TaskActivity>>;
};

export type TaskCreateInput = {
  categoryId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueAt?: InputMaybe<Scalars['DateTime']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type TaskListResult = {
  __typename?: 'TaskListResult';
  data?: Maybe<Array<Task>>;
  pagination: Pagination;
};

export type TaskSingleResult = {
  __typename?: 'TaskSingleResult';
  data?: Maybe<Task>;
};

export type TaskUpdateInput = {
  categoryId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  dueAt?: InputMaybe<Scalars['DateTime']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: string | null, firstName: string, lastName: string, email: string } | null };

export type LoginMutationVariables = Exact<{
  input: AuthLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', authLogin?: { __typename?: 'AuthLoginResult', token: string, user: { __typename?: 'User', id?: string | null, firstName: string, lastName: string, email: string } } | null };

export type RegisterMutationVariables = Exact<{
  input: AuthRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', authRegister?: string | null };

export type CategoryFragment = { __typename?: 'Category', createdAt: string, id: string, name: string, ordering: number, updatedAt: string };

export type FindManyCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyCategoryQuery = { __typename?: 'Query', findManyCategory: { __typename?: 'CategoryListResult', pagination: { __typename?: 'Pagination', totalItems?: number | null }, data?: Array<{ __typename?: 'Category', createdAt: string, id: string, name: string, ordering: number, updatedAt: string }> | null } };

export type TaskActivityCreateMutationVariables = Exact<{
  input: TaskActivityCreateInput;
}>;


export type TaskActivityCreateMutation = { __typename?: 'Mutation', taskActivityCreate: { __typename?: 'TaskActivity', action: string, after?: string | null, before?: string | null, createdAt: string, description?: string | null, id: string, updatedAt: string } };

export type TaskFragment = { __typename?: 'Task', updatedAt: string, title: string, isCompleted: boolean, id: string, description?: string | null, createdAt: string, dueAt?: string | null, completedAt?: string | null, categoryId: string, category: { __typename?: 'CategorySingleResult', data?: { __typename?: 'Category', id: string, name: string, ordering: number, updatedAt: string, createdAt: string } | null } };

export type TaskCompletedFragment = { __typename?: 'Task', id: string, title: string, isCompleted: boolean, dueAt?: string | null, description?: string | null, createdAt: string, completedAt?: string | null, categoryId: string, updatedAt: string, category: { __typename?: 'CategorySingleResult', data?: { __typename?: 'Category', createdAt: string, description?: string | null, name: string, updatedAt: string, ordering: number, id: string } | null }, activity: { __typename?: 'TaskActivityListResult', data?: Array<{ __typename?: 'TaskActivity', action: string, after?: string | null, before?: string | null, createdAt: string, description?: string | null, id: string, updatedAt: string }> | null } };

export type FindManyTaskQueryVariables = Exact<{ [key: string]: never; }>;


export type FindManyTaskQuery = { __typename?: 'Query', findManyTask: { __typename?: 'TaskListResult', pagination: { __typename?: 'Pagination', totalItems?: number | null }, data?: Array<{ __typename?: 'Task', updatedAt: string, title: string, isCompleted: boolean, id: string, description?: string | null, createdAt: string, dueAt?: string | null, completedAt?: string | null, categoryId: string, category: { __typename?: 'CategorySingleResult', data?: { __typename?: 'Category', id: string, name: string, ordering: number, updatedAt: string, createdAt: string } | null } }> | null } };

export type TaskCreateMutationVariables = Exact<{
  input: TaskCreateInput;
}>;


export type TaskCreateMutation = { __typename?: 'Mutation', taskCreate: { __typename?: 'Task', updatedAt: string, title: string, isCompleted: boolean, id: string, description?: string | null, createdAt: string, dueAt?: string | null, completedAt?: string | null, categoryId: string, category: { __typename?: 'CategorySingleResult', data?: { __typename?: 'Category', id: string, name: string, ordering: number, updatedAt: string, createdAt: string } | null } } };

export type TaskUpdateMutationVariables = Exact<{
  taskId: Scalars['UUID']['input'];
  input: TaskUpdateInput;
}>;


export type TaskUpdateMutation = { __typename?: 'Mutation', taskUpdate: { __typename?: 'Task', updatedAt: string, title: string, isCompleted: boolean, id: string, description?: string | null, createdAt: string, dueAt?: string | null, completedAt?: string | null, categoryId: string, category: { __typename?: 'CategorySingleResult', data?: { __typename?: 'Category', id: string, name: string, ordering: number, updatedAt: string, createdAt: string } | null } } };

export type OrderedTasksByCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type OrderedTasksByCategoryQuery = { __typename?: 'Query', orderedTasksByCategory: { __typename?: 'TaskListResult', pagination: { __typename?: 'Pagination', totalItems?: number | null }, data?: Array<{ __typename?: 'Task', updatedAt: string, title: string, isCompleted: boolean, id: string, description?: string | null, createdAt: string, dueAt?: string | null, completedAt?: string | null, categoryId: string, category: { __typename?: 'CategorySingleResult', data?: { __typename?: 'Category', id: string, name: string, ordering: number, updatedAt: string, createdAt: string } | null } }> | null } };

export type FindUniqueTaskQueryVariables = Exact<{
  taskId: Scalars['UUID']['input'];
}>;


export type FindUniqueTaskQuery = { __typename?: 'Query', findUniqueTask?: { __typename?: 'TaskSingleResult', data?: { __typename?: 'Task', id: string, title: string, isCompleted: boolean, dueAt?: string | null, description?: string | null, createdAt: string, completedAt?: string | null, categoryId: string, updatedAt: string, category: { __typename?: 'CategorySingleResult', data?: { __typename?: 'Category', createdAt: string, description?: string | null, name: string, updatedAt: string, ordering: number, id: string } | null }, activity: { __typename?: 'TaskActivityListResult', data?: Array<{ __typename?: 'TaskActivity', action: string, after?: string | null, before?: string | null, createdAt: string, description?: string | null, id: string, updatedAt: string }> | null } } | null } | null };
