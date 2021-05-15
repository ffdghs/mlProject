import productsManager from '../managers/productsManager.js';

class ProductsController {
  getProducts(req,res) {
    // const date = req.body.date;
    const date = '';
    productsManager.getProductsByDate(date,(err,productsList) => {
      if(err !== null) {
        res.status(400).send({error:`${err}`});
        return;
      }
      res.status(200).send(productsList);
    })
  }
}

export default new ProductsController();
