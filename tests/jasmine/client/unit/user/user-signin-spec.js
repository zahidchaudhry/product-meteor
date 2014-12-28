describe("User Sign in", function() {

    it("should be able to login user", function (done) {
        Meteor.loginWithPassword('zahid.ali@tkxel.com', 'tkxel1234', function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should be able to logout", function (done) {
        Meteor.logout(function (err) {
            expect(err).toBeUndefined();
            done();
        });
    });

    it("should not be able to login user with incorrect credentials", function (done) {
        Meteor.loginWithPassword('dummy@tkxel.com', 'wrongpassword', function (err) {
            expect(err).toBeDefined();
            done();
        });
    });


});