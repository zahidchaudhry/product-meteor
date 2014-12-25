Template.productEdit.created = function() {
  Session.set('productEditErrors', {});
}

Template.productEdit.helpers({
  errorMessage: function(field) {
    return Session.get('productEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('productEditErrors')[field] ? 'has-error' : '';
  }
});

Template.productEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentProductId = this._id;
    
    var productProperties = {
      name: $(e.target).find('[name=name]').val(),
      type: $(e.target).find('[name=type]').val(),
      price: $(e.target).find('[name=price]').val()
    }
    
    var errors = validateProduct(productProperties);
    if (errors.title || errors.url)
      return Session.set('productEditErrors', errors);
    
    Products.update(currentProductId, {$set: productProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('productPage', {_id: currentProductId});
      }
    });
  }
});
