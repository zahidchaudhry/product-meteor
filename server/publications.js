Meteor.publish('products', function(options) {
//  check(options, {
//    sort: Object,
//    limit: Number
//  });
  return Products.find({}, options);
});

Meteor.publish('singleProduct', function(id) {
  check(id, String);
  return Products.find(id);
});

