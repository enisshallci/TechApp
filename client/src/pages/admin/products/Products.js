import './Products.css'

export const Contact =()=>{
    return(
        <div>
            <div className="container">
                <div className="back-button"><button>Go back</button></div>
                <div className="container-form">
                    <h1>Create a new product</h1>
                    <form>
                        <label for="name">Name</label>
                        <input type="text" id="name"></input>
                        <label for="description">Description</label>
                        <textarea></textarea>
                        <label for="count">Count in stock</label>
                        <input type="text" id="count"></input>
                        <label for="price">Price</label>
                        <input type="text" id="price"></input>
                        <label for="category">Category</label>
                        <select placeholder="Choose category">
                            <option>Computers</option>
                            <option>Camera</option>
                            <option>Computers/Laptops</option>
                            <option>Computers/Laptops/Lenovo</option>
                            <option>Computers/Laptops/Dell</option>
                            <option>Monitor</option>
                        </select>
                        <label for="new-category">Or create a new category(e.g. Computers/Laptops/Intel)</label>
                        <input id="new-category"></input>
                        <div className="attribute">
                            <div className="newAttribute">
                                <label for="new-attribute">Create new attribute</label>
                                <input id="new-attribute" placeholder="first choose or create category"></input>
                            </div>
                            <div className="newAttribute attValue">
                                <label for="attribute-value">Attribute value</label>
                                <input id="attribute-value" placeholder="first choose or create category"></input>
                            </div>
                        </div>
                        <label for="images">Images</label>
                        <input className="file" type="file"></input>
                        <button>Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}