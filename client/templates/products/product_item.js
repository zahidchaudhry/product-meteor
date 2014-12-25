var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

Template.productItem.helpers({
  ownProduct: function() {
    return this.userId == Meteor.userId();
  }
});

Template.productItem.events({

  'click .destroy': function(e) {
    e.preventDefault();

    if (confirm("Delete this product?")) {
      var currentProductId = this._id;
      Products.remove(currentProductId);
      Router.go('home');
    }
  }
});


