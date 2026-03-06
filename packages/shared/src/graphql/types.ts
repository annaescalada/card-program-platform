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
};

export type Card = {
  __typename?: 'Card';
  balance: Scalars['Float']['output'];
  cardNumber: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: CardStatus;
};

export enum CardStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Expired = 'EXPIRED'
}

export type IssueCardInput = {
  cardNumber: Scalars['String']['input'];
  initialBalance: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  blockCard: Card;
  issueCard: Card;
};


export type MutationBlockCardArgs = {
  id: Scalars['ID']['input'];
};


export type MutationIssueCardArgs = {
  input: IssueCardInput;
};

export type Query = {
  __typename?: 'Query';
  card?: Maybe<Card>;
  cards: Array<Card>;
};


export type QueryCardArgs = {
  id: Scalars['ID']['input'];
};
