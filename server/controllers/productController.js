const Product = require("../models/ProductModel")   
const recordsPerPage = require("../config/pagination")

const getProducts = async (req, res, next) => {
    try {
        
        let query = {};
        let queryCondition = false;

        let priceQueryCondition = {} 
        if (req.query.price) {
            queryCondition = true;
            priceQueryCondition = { price: { $lte : Number(req.query.price) }}        
          
        }

        //disa ndryshime per te organizuar kod dinamik:
        let ratingQueryCondition = {};

        if (req.query.rating) {
            const ratings = req.query.rating.split(",");
            if (ratings.length === 1) {
                queryCondition = true;
                ratingQueryCondition = { rating: Number(ratings[0]) };
            } else {
                queryCondition = true;
                ratingQueryCondition = { rating: { $in: ratings.map(Number) }};
            }
        }


        if (queryCondition) {
            query = {
                $and: [priceQueryCondition, ratingQueryCondition]       
           }
        }

        const pageNum = Number(req.query.pageNum) || 1      
      
        let sort = {}   
        const sortOption = req.query.sort || ""
        if (sortOption) {
            let sortOpt = sortOption.split("_")         
            sort = {[sortOpt[0]] : Number(sortOpt[1])}    
        } 

        
        const totalProducts = await Product.countDocuments(query)      

        const products = await Product.find(query).skip(recordsPerPage * (pageNum - 1)).sort(sort).limit(recordsPerPage)        
    
        
        res.json({products, pageNum, pagiationLinksNumber: Math.ceil(totalProducts / recordsPerPage)})  

    } catch(error) {
        next(error)
    }
}


module.exports = getProducts