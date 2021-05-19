import productsManager from '../managers/productsManager';

class ProductsController {
  getProducts(req, res) {
    this.date = new Date(`${req.body.year}-${req.body.month}-${req.body.day}`);
    productsManager.getProductsByDate(this.date, (err, productsList) => {
      if (err !== null) {
        res.status(400).send({
          error: `${err}`,
        });
        return;
      }
      res.status(200).send(productsList);
    });
  }
}

export default new ProductsController();
