const mongoose = require("mongoose")
const Review = require("./ReviewModel")

const imageSchema = mongoose.Schema({
    path: {
        type: String,
        required: true
    }
})

const productSchema = mongoose.Schema({

    name: {                 //Emri
        type: String,
        required: true,
        unique: true
    },
    description: {          //Pershkrimi i produktit
        type: String,
        required: true
    },
    category: {             //Kategoria
        type: Number,
        required: true
    },
    price: {                //çmimi
        type: Number,
        required: true
    },
    rating: {               //Ne forme te yllave ose ndonje forme tjeter.
        type: Number,
    },
    reviewsNumber: {        //Mendimi: Sa usera(klienta) kane bo review nje produkt te caktuar
        type: Number,
        default: 0
    },
    sales: {                //Sa shitje
        type: Number,
        default: 0
    },
    atributes: [            //
        [{key: {type: String}, value: {type: String}}]
    ],
    images: [imageSchema],    
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Review
        }
    ]


}, {
    timestamps: true,
});


productSchema.index({name: "text", description: "text"}, {name: "TextIndex"})
productSchema.index({"atributes.key": 1, "atributes.value": 1})


const Product = mongoose.model("Product", productSchema)

module.exports = Product