import { gql } from "@apollo/client";

export const ISSUE_CARD = gql`
    mutation Mutation($input: IssueCardInput!) {
      issueCard(input: $input) {
        balance
        cardNumber
        createdAt
        id
        status
      }
    }`