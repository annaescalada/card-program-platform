import { gql } from "@apollo/client"

export const GET_CARDS = gql`
    query Cards {
      cards {
        balance
        cardNumber
        createdAt
        id
        status
      }
    }`

export const GET_CARDS_BY_ID = gql`
    query Card($id: ID!) {
      card(id: $id) {
        balance
        cardNumber
        createdAt
        id
        status
      }
    }`