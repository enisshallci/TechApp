import wishlistModel from '../models/wishlistModel.js';



export const createWishlistController = async (req, res) => {
    try {
      const { products } = req.body;
      const wishlist = await wishlistModel.create({ user: req.user._id, products });
      const userId = wishlist.user; 
      res.status(201).json(wishlist);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create wishlist' });
    }
  };

  export const getUserWishlists = async (req, res) => {
    try {
      const wishlists = await wishlistModel.find({ user: req.user._id }).populate('products');
      res.status(200).json(wishlists );
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to get user wishlists' });
    }
}
export const deleteProductFromWishlist = async (req, res) => {
  try {
    const { wishlistId, productId } = req.params;

    const wishlist = await wishlistModel.findById(wishlistId);

    if (!wishlist) {
      return res.status(404).json({ error: 'Wishlist not found' });
    }

    // Remove the product from the wishlist
    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );

    await wishlist.save();

    res.json({ success: true, message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove product from wishlist' });
  }
};


// // Get all wishlists
// export const getAllWishlists =  async (req, res) => {
//     try {
//       const wishlists = await wishlistModel.find().populate('user products');
//       res.json({ wishlists });
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch wishlists' });
//     }
//   };
  