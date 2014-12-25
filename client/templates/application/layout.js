Template.layout.events({
    'click .js-logout': function() {
        Meteor.logout();
        Router.go('signin');
    }
})