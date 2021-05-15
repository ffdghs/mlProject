import { GraphQLClient,gql } from 'graphql-request';

const client = new GraphQLClient(
  'https://api.producthunt.com/v2/api/graphql',
  {
    headers: {
    Authorization: 'Bearer KuFi-I33ByNlRPgdcsLzvAVlfzza5YxRQsLXuSrNhfs'
    }
  }
);

class ProductsManager {
  getProductsByDate(date,callback) {
    const query = gql`{
      posts(postedAfter:"2021-05-11T00:00:00Z" postedBefore:"2021-05-12T00:00:00Z") {
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
