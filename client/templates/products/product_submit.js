Template.productSubmit.created = function() {
  Session.set('productSubmitErrors', {});
}

Template.productSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('productSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('productSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.productSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var product = {
      type: $(e.target).find('[name=type]').val(),
      name: $(e.target).find('[name=title]').val(),
      price: parseInt($(e.target).find('[name=price]').val())
    };
    
    var errors = validateProduct(product);
    if (errors.name || errors.type || errors.price)
      return Session.set('productSubmitErrors', errors);
    
    Meteor.call('productInsert', product, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.productExists)
        throwError('This product has already been added.');
      
      Router.go('productPage', {_id: result._id});  
    });
  }
});
