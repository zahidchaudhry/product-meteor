// Fixture data 
if (Products.find().count() === 0) {
  var now = new Date().getTime();
  Products.insert({
    name: 'Samsung Galaxy Tab 4',
    price: 149.99,
    type: 'Tablet',
    created_at: new Date(now - 12 * 3600 * 1000)
  });

  Products.insert({
    name: 'Munchkin Mozart Magic Cube',
    price: 15.00,
    type: 'Toy',
    created_at: new Date(now - 12 * 3600 * 1000)
  });

  Products.insert({
    name: 'Aquarium Triplex Betta Tank',
    price: 16.99,
    type: 'Aquarium',
    created_at: new Date(now - 12 * 3600 * 1000)
  });

  Products.insert({
    name: 'Evenflo Soft Baby Carrier',
    price: 49.99,
    type: 'Baby Carrier',
    created_at: new Date(now - 12 * 3600 * 1000)
  });

}

if (Meteor.users.find().count() == 0) {
  var users = [
    {name:"Zahid Ali",email:"zahid.ali@tkxel.com", password: "tkxel1234"},
    {name:"Admin User",email:"admin@tkxel.com", password: "admin3210"}
  ];

  _.each(users, function (user) {
    var id = Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: { name: user.name }
    });
  });
}
