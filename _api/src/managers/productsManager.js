import { GraphQLClient,gql } from 'graphql-request';
import dotenv from 'dotenv';

dotenv.config();

const { API_PH_TOKEN, API_PH_URI } = process.env;

const client = new GraphQLClient(
  API_PH_URI,
  {
    headers: {
    Authorization: 'Bearer ' + API_PH_TOKEN
    }
  }
);

class ProductsManager {
  getProductsByDate(date,callback) {
    const query = gql`{
      posts(postedAfter:"2021-05-05T00:00:00Z" postedBefore:"2021-05-06T00:00:00Z" first:100) {
        edges {
          node {
            id
            name
            url
            createdAt
            makers {
              id
              name
            }
          }
        }
      }
    }`;

    client.request(query).then((data) => callback(null,data));
  }
}

export default new ProductsManager();
