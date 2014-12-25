// file: tests/client/integration/productIntegrationSpec.js

"use strict";
describe("Product", function () {
    it("should be created by logged in user", function (done) {
        // login to system and wait for callback
        Meteor.loginWithPassword("zahid.ali@tkxel.com", "tkxel1234", function(err) {
            // check if we have correctly logged in the system
            expect(err).toBeUndefined();

            // create a new product
            var product = {
                type: 'integration',
                name: 'test 1',
                price: 20.99
            };
            Meteor.call('productInsert', product, function(error, result) {
                expect(error).toBeUndefined();
                Meteor.logout(function() {
                    done();
                })
            });
        });
    });
    it("should be allowed to be deleted by owner user", function (done) {
        // login to system and wait for callback
        Meteor.loginWithPassword("zahid.ali@tkxel.com", "tkxel1234", function(err) {
            // check if we have correctly logged in the system
            expect(err).toBeUndefined();

            // create a new product
            var product = {
                type: 'integration',
                name: 'test 00',
                price: 20.99
            };
            Meteor.call('productInsert', product, function(error, result) {
                expect(error).toBeUndefined();
                var response = Products.remove(result._id);
                expect(response).toEqual(1);
                Meteor.logout(function() {
                    done();
                })
            });
        });
    });

    it("should not be created by non logged in user", function () {
        // create a new product
        var product = {
            type: 'integration',
            name: 'test 1',
            price: 20.99
        };
        Meteor.call('productInsert', product, function(error, result) {
            expect(error).toBeDefined();
        });
    });

    it("should not be allowed to be deleted by non owner user", function () {
        // login to system and wait for callback
        Meteor.loginWithPassword("zahid.ali@tkxel.com", "tkxel1234", function(err) {
            // check if we have correctly logged in the system
            expect(err).toBeUndefined();
            var product = Products.findOne();
            var response = Products.remove(product._id);
            expect(response).toEqual('remove failed: Access denied');
        });
    });

});