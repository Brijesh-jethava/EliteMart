const Feature = require('../../models/feature')



const addFeatureImage = async (req, res) => {
    try {
        console.log("Raw Request Body:", req.body);  // Check if `req.body` is received

        const { image } = req.body;  
        if (!image) {
            return res.status(400).json({ success: false, message: "Image URL is required" });
        }

        console.log("Received Image:", image);  // Debugging log

        const featureImage = new Feature({ image });
        await featureImage.save();

        res.status(201).json({
            success: true,
            data: featureImage
        });

    } catch (error) {
        console.error("Error adding feature image:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


const getFeatureImages = async (req, res) => {
    try{
        const images = await Feature.find();
        res.status(200).json({
            success:true,
            data:images
        });
    }catch(error){
        console.log(error);
        res.status(500).json(
            {
                success:false,
                message:'Internal server error'
            });
    }
}

module.exports = {addFeatureImage, getFeatureImages};