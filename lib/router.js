Router.configure({
  layoutTemplate: 'layout', // default layout template
  loadingTemplate: 'loading', // loading template to show spinner while data is being loaded
  notFoundTemplate: 'notFound', // not found template in case data does not exist
  waitOn: function() { // loading template needs to know against which data to wait on
    return [Meteor.subscribe('orphanProducts'), Meteor.subscribe('userProducts')]
  }
});

// controller for fetching data for products list page
ProductsListController = RouteController.extend({
  template: 'productsList',
  sort: {submitted: -1, _id: -1},
  findOptions: function() {
    return {sort: this.sort};
  },
  products: function() {
    return Products.find({}, this.findOptions());
  },
  data: function() {
    return {
      products: this.products()
    };
  }
});

// route for product listing
Router.route('/', {
  name: 'home',
  controller: ProductsListController
});

// route for showing existing product
Router.route('/products/:_id', {
  name: 'productPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleProduct', this.params._id)
    ];
  },
  data: function() { return Products.findOne(this.params._id); }
});

// route for editing existing product
Router.route('/products/:_id/edit', {
  name: 'productEdit',
  waitOn: function() { 
    return Meteor.subscribe('singleProduct', this.params._id);
  },
  data: function() { return Products.findOne(this.params._id); }
});

// route for creating new product
Router.route('/submit', {name: 'productSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      // if not login take user to log in page
      Router.go('signin');
    }
  } else {
    // continue to render template
    this.next();
  }
}

Router.map(function() {
  this.route('join');
  this.route('signin');
});

// if no product found again given it show not found page.
Router.onBeforeAction('dataNotFound', {only: 'productPage'});
// require user to be logged in for all pages except for sign in and sign up pages
Router.onBeforeAction(requireLogin, {except: ['signin','join']});
