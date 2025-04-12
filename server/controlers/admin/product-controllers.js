const {ImageUploadUtil} = require('../helpers/cloudinary')
const Product = require('../../models/Product')

const handleImageUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded.",
            });
        }

        console.log("File received in request:", req.file); // Log file details

        // Convert buffer to Base64 string
        const b64 = req.file.buffer.toString("base64");
        const url = `data:${req.file.mimetype};base64,${b64}`;
        console.log("Generated Data URL:", url.slice(0, 100)); // Log first 100 characters

        // Upload to Cloudinary
        const result = await ImageUploadUtil(url);
        console.log("Cloudinary Upload Result:", result);

        return res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("Error during image upload:", error.message || error);

        // Respond with the actual error message for debugging
        return res.status(500).json({
            success: false,
            message: error.message || "Some error occurred.",
        });
    }
};

//add new products
const addProduct = async(req,res) =>{
  try{
    const {image,title,descreption,category,brand,price,salePrice,totalStock} = req.body;
    const newlyCreatedProduct = new Product({
        image,
        title,
        descreption,
        category,
        brand,
        price,
        salePrice,
        totalStock
    })
    await newlyCreatedProduct.save();
    res.status(201).json({
        success:true,
        data:newlyCreatedProduct
    })
  }catch(e){
    console.log(e);
    res.status(500).json({
        success: false,
        message: "Some error occurred.",
    })
  }
}

//fetch all products
const fetchAllProducts = async(req,res) => 
{
    try{
      const listOfProducts = await Product.find({});
      res.status(200).json({
        success:true,
        data:listOfProducts
      })
    }catch(e){
      console.log(e);
      res.status(500).json({
          success: false,
          message: "Some error occurred.",
      })
    }
}

//Edit a Product
const editProduct = async(req,res) =>{
    try{
      const {id} = req.params;
      const {image,title,descreption,category,brand,price,salePrice,totalStock} = req.body;
  
      let findProduct = await Product.findById(id);
      if(!findProduct)
        return res.status(404).json({
          success:false,
          message:'Product not found'
       });
        
       findProduct.image = image || findProduct.image;
       findProduct.title = title || findProduct.title;
       findProduct.descreption = descreption || findProduct.descreption;
       findProduct.category = category || findProduct.category;
       findProduct.brand = brand || findProduct.brand;
       findProduct.price = price === '' ? 0 : price || findProduct.price;
       findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
       findProduct.totalStock = totalStock || findProduct.totalStock;

       await findProduct.save();
       res.status(200).json({
        success:true,
        data:findProduct
       })
    }catch(e){
      console.log(e);
      res.status(500).json({
          success: false,
          message: "Some error occurred.",
      })
    }
}

//Delete a Product
const deleteProduct = async(req,res) =>{
    try{
       const {id} = req.params;
       const findProduct = await Product.findByIdAndDelete(id);

       if(!findProduct)
         return res.status(404).json({
           success:false,
           message:'Product not found'
        })
        
        res.status(200).json({
            success:true,
            message:'Product deleted successfully'
        })
    }catch(e){
      console.log(e);
      res.status(500).json({
          success: false,
          message: "Some error occurred.",
      })
    }
} 

module.exports = { handleImageUpload,addProduct,fetchAllProducts,editProduct,deleteProduct};