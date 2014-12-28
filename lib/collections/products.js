Products = new Mongo.Collection('products');

// Rules for Product collection manipulation
Products.allow({
  update: function(userId, product) {
    // only allow product update it is owned by current user
    return ownsDocument(userId, product); },
  remove: function(userId, product) {
    // only allow product deletion it is owned by current user
    return ownsDocument(userId, product); },
  insert: function(userId, product) {
    // the user must be logged in, and the document must be owned by the user
    return (product && product.userId === Meteor.userId());
  }
});

// function to check presence of required fields
validateProduct = function (product) {
  var errors = {};

  if (!product.name)
    errors.name = "Please fill in product name";
  
  if (!product.type)
    errors.type =  "Please fill in product type.";

  if (!product.price)
    errors.price =  "Please fill in product price.";

  return errors;
}

Meteor.methods({
  // method for creating product
  productInsert: function(productAttributes) {
    // if non logged in user tries to insert throw access denied error
    var user = Meteor.user();
    if (user == undefined || user._id == undefined ) {
      throw new Meteor.Error(403, "Access Denied");
    }

    check(user._id, String);

    // check for attribute presence
    var errors = validateProduct(productAttributes);
    if (errors.name || errors.type || errors.price)
      throw new Meteor.Error('invalid-product', "You must set a name, type and price for your product");

    // verify data type of product params
    check(productAttributes, {
     name: String,
     type: String,
     price: Number
    });

    // check if product with same name already exist, if product already exist return its ID
    var productWithSameName = Products.findOne({name: productAttributes.name});
    if (productWithSameName) {
      return {
        productExists: true,
        _id: productWithSameName._id
      }
    }
    // add logged in user's id and name along with current time.
    var product = _.extend(productAttributes, {
      userId: user._id,
      author: user.email,
      created_at: new Date()
    });

    var productId = Products.insert(product);
    //return id of newly created product
    return {
      _id: productId
    };
  },

  productUpdate: function(productId, productAttributes) {
    // verify data type of product params
    check(productId, String);
    check(productAttributes, {
      name: String,
      type: String,
      price: Number
    });
    // may only edit the following three fields:
    var extraAttrPresent = _.without(_.keys(productAttributes), 'name', 'type', 'price').length > 0;
    if (extraAttrPresent || _.keys(productAttributes).length == 0) {
      return;
    }
    var errors = validateProduct(productAttributes);
    // dont allow product update if any of these 3 fields are missing
    if (errors.name || errors.type || errors.price) {
      return errors.name || errors.type || errors.price;
    }
    Products.update(productId, {$set: productAttributes});
  }


});
