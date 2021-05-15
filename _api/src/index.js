import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

import { request, gql } from 'graphql-request';
import productsController from './controllers/productsController.js';

dotenv.config();

const { PORT } = process.env;

const app = express();

app.listen(PORT, () => {
  console.log(`App started and listening on port : ${PORT}`);
});

app.get(
  '/products',
    productsController.getProducts.bind(productsController)
  )

// const query = gql`
//   {
//     Movie(title: "Inception") {
//       releaseDate
//       actors {
//         name
//       }
//     }
//   }
// `

// request('https://api.graph.cool/simple/v1/movies', query).then((data) => console.log(data))

// const requestProductHunt = {
//   headers: {
//     Authorization: 'Bearer KuFi-I33ByNlRPgdcsLzvAVlfzza5YxRQsLXuSrNhfs',
//     "Content-type": "application/json",
//   },
//   method: "POST",
//   body: JSON.stringify({
//     query: `query { posts(last: 5, order: VOTES) {
//         edges{
//           cursor
//           node{
//             date
//             id
//             name
//             tagline
//             description
//             url
//             votesCount
//             thumbnail{
//               type
//               url
//             }
//             website
//             reviewsRating
// }}}}`
//   })
// }

// fetch(`https://api.producthunt.com/v2/api/graphql`, requestProductHunt)
//     .then(res => {
//       return res.json();
//     })
//     .then(json => {
//       console.log(json.data.posts.edges[0]);
//     })
//     .catch(err => {
//       console.log(err);
//     });
