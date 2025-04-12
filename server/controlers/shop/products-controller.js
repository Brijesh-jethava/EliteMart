const Product = require('../../models/Product')
const mongoose = require('mongoose')

const getFilteredProducts = async (req, res) => {
    try{
         
        const { category = '', brand = '', sortBy = 'price-low-to-high' } = req.query;

       

        let filters = {};
        if (category) {
            
            filters.category = { $in: category.split(',') };
        }
            
        if (brand) {
            filters.brand = { $in: brand.split(',') };
          }

    

            let sort = {};

            switch(sortBy){
                case "price-low-to-high":
                    sort.price = 1;
                    break;

                case "price-high-to-low":
                        sort.price = -1;
                        break;

                case "title-a-z":
                        sort.title = 1;
                        break;

                case "title-z-a":
                        sort.title = -1;
                        break;
                  
                default:
                    sort.price = 1;
                    break;        
            }
         
           const products = await Product.find(filters).sort(sort)
             res.status(200).json({
               success:true,
               data: products
        })

    }catch(error)
    {
       
        res.status(500).json({
            success:false,
            message:'Some error occured'
        })
    }

}

const getProductDetails = async (req, res) => {
    try{
      const { id } = req.params;

      if (!id || id === "null") {
        return res.status(400).json({
            success: false,
            message: "Invalid Product ID",
        });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid ObjectId format",
        });
    }
      const product = await Product.findById(id);

      if(!product){
        return res.status(404).json({
          success:false,
          message:'Product not found'
        })
      }

        res.status(200).json({
            success:true,
            data: product
        })

    }catch(error)
    {
      
        res.status(500).json({
            success:false,
            message:'Some error occured'
        })
    }
}

module.exports = {getFilteredProducts,getProductDetails}