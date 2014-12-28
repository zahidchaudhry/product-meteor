// publish products created by the user
Meteor.publish('userProducts', function(options) {
  return Products.find({userId: this.userId}, options);
});

// publish products not associated with any user
Meteor.publish('orphanProducts', function(options) {
  return Products.find({userId: null}, options);
});

// publish single product against given ID
Meteor.publish('singleProduct', function(id) {
  check(id, String);
  return Products.find(id);
});

