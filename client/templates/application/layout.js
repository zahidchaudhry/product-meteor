Template.layout.events({
    // should sign out user on clicking logout button
    'click .js-logout': function() {
        Meteor.logout();
        Router.go('signin');
    }
})