const connectDB = require("../config/db");
connectDB();

const categoryData = require("./categories")          
const productData = require("./products")
const reviewData = require("./reviews.js")
const userData = require("./users.js")
const orderData = require("./orders")



const Category = require("../models/CategoryModel.js")    
const Product = require("../models/ProductModel.js")         
const Review = require("../models/ReviewModel")
const User = require("../models/UserModel")
const Order = require("../models/OrderModel")

const importData = async() => {     

    try {

        await Category.collection.dropIndexes()
        await Product.collection.dropIndexes()
       
      

        await Category.collection.deleteMany({})      
        await Product.collection.deleteMany({})
        await Review.collection.deleteMany({})
        await User.collection.deleteMany({})
        await Order.collection.deleteMany({})

        await Category.insertMany(categoryData)      
        const reviews =  await Review.insertMany(reviewData)
        const sampleProducts = productData.map((product) => {       
            reviews.map((review) => {
                product.reviews.push(review._id)
            })
            return {...product}    
        })

        await Product.insertMany(sampleProducts)
        await User.insertMany(userData)
        await Order.insertMany(orderData)

        console.log("Seeder data eshte procesuar me sukses ")
        process.exit()
    } catch(error) {
        console.error(error)
        process.exit(1);        
    }
}

importData();

