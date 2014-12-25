Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('products')]
  }
});

ProductsListController = RouteController.extend({
  template: 'productsList',
  increment: 5, 
  productsLimit: function() { 
    return parseInt(this.params.productsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.productsLimit()};
  },
  products: function() {
    return Products.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.products().count() === this.productsLimit();
    return {
      products: this.products(),
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

NewProductsController = ProductsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newProducts.path({productsLimit: this.productsLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewProductsController
});

Router.route('/new/:productsLimit?', {name: 'newProducts'});

Router.route('/products/:_id', {
  name: 'productPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleProduct', this.params._id)
    ];
  },
  data: function() { return Products.findOne(this.params._id); }
});

Router.route('/products/:_id/edit', {
  name: 'productEdit',
  waitOn: function() { 
    return Meteor.subscribe('singleProduct', this.params._id);
  },
  data: function() { return Products.findOne(this.params._id); }
});

Router.route('/submit', {name: 'productSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      //this.render('accessDenied');
      Router.go('signin');
    }
  } else {
    this.next();
  }
}

Router.map(function() {
  this.route('join');
  this.route('signin');
});


Router.onBeforeAction('dataNotFound', {only: 'productPage'});
Router.onBeforeAction(requireLogin, {except: ['signin','join']});
