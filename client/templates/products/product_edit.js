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
0
    // get values from form and create a hash object
    var productProperties = {
      name: $(e.target).find('[name=name]').val(),
      type: $(e.target).find('[name=type]').val(),
      price: parseInt($(e.target).find('[name=price]').val())
    }

    // validate attribute presence
    var errors = validateProduct(productProperties);
    if (errors.title || errors.type || errors.price)
      return Session.set('productEditErrors', errors);
    
    Meteor.call('productUpdate', currentProductId, productProperties, function(error) {
      // display the error to the user and abort
      if (error) {
        return throwError(error.reason);
      }

      Router.go('productPage', {_id: currentProductId});
    });

  }
});
