Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.rendered = function() {
  var error = this.data;
  // remove error message after 3 seconds
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 3000);
};