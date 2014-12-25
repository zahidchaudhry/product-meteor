Products = new Mongo.Collection('products');

Products.allow({
  update: function(userId, product) { return ownsDocument(userId, product); },
  remove: function(userId, product) { return ownsDocument(userId, product); }
});

Products.deny({
  update: function(userId, product, fieldNames) {
    // may only edit the following three fields:
    return (_.without(fieldNames, 'type', 'name', 'price').length > 0);
  }
});

Products.deny({
  update: function(userId, product, fieldNames, modifier) {
    var errors = validateProduct(modifier.$set);
    return errors.name || errors.type || errors.price;
  }
});

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
  productInsert: function(productAttributes) {
    if (this.userId == undefined ) {
      throw new Meteor.Error(403, "Access Denied");
    }
    check(this.userId, String);
    check(productAttributes, {
     name: String,
     type: String,
     price: Number
    });
    
    var errors = validateProduct(productAttributes);
    if (errors.name || errors.type || errors.price)
      throw new Meteor.Error('invalid-product', "You must set a name, type and price for your product");
    
    var productWithSameName = Products.findOne({name: productAttributes.name});
    if (productWithSameName) {
      return {
        productExists: true,
        _id: productWithSameName._id
      }
    }
    
    var user = Meteor.user();
    var product = _.extend(productAttributes, {
      userId: user._id, 
      author: user.username, 
      created_at: new Date()
    });

    var productId = Products.insert(product);

    return {
      _id: productId
    };
  }
});
