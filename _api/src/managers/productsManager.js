import {
  GraphQLClient,
  gql,
} from 'graphql-request';
import dotenv from 'dotenv';

dotenv.config();

const {
  API_PH_TOKEN,
  API_PH_URI,
} = process.env;

const client = new GraphQLClient(
  API_PH_URI, {
    headers: {
      Authorization: `Bearer ${API_PH_TOKEN}`,
    },
  },
);

class ProductsManager {
  getProductsByDate(date, callback) {
    console.log(date);
    const calcDate = date.getTime() + 86400000;
    const calcEndDate = new Date(calcDate);
    this.dateStart = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}T00:00Z`;
    this.dateEnd = `${calcEndDate.getFullYear()}-${calcEndDate.getMonth() + 1}-${calcEndDate.getDay()}T00:00Z`;
    console.log(this.dateStart);
    console.log(this.dateEnd);

    const variables = {
      dateStartQuery: this.dateStart,
      dateEndQuery: this.dateEnd,
    };

    const query = gql`
      query getPosts($dateStartQuery: DateTime, $dateEndQuery: DateTime)
    {
      posts(postedAfter:$dateStartQuery postedBefore:$dateEndQuery first:100) {
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
    }
    `;

    try {
      client.request(query, variables).then((data) => callback(null, data));
    } catch (error) {
      callback(error, null);
    }
  }
}

export default new ProductsManager();
