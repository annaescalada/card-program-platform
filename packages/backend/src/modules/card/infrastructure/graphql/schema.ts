export const cardTypeDefs = `#graphql
  type Card {
    id: ID!
    cardNumber: String!
    status: CardStatus!
    balance: Float!
    createdAt: String!
  }

  enum CardStatus {
    ACTIVE
    BLOCKED
    EXPIRED
  }

  input IssueCardInput {
    cardNumber: String!
    initialBalance: Float!
  }

  type Query {
    cards: [Card!]!
    card(id: ID!): Card
  }

  type Mutation {
    issueCard(input: IssueCardInput!): Card!
    blockCard(id: ID!): Card!
  }
`