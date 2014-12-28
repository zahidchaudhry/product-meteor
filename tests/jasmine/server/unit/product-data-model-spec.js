// file: tests/server/unit/product-data-model-spec.js

"use strict";
describe("Product", function () {

    var productAttributes;

    beforeEach(function() {
        productAttributes = {
            type: 'integration',
            name: 'test 00',
            price: 20.99
        };
        spyOn(Products, "insert").and.callThrough();
    });

    afterEach(function() {
        productAttributes = null;
    });

    it("should not be created when no user provided", function () {
        try {
            Meteor.methodMap.productInsert(productAttributes);
        } catch(ex) {
            expect(ex).toBeDefined();
        }

        expect(Products.insert).not.toHaveBeenCalled();
    });

    it("should be created with type, nam, price, user id and user email", function () {
        // use last call to access arguments
        spyOn(Meteor, "user").and.returnValue({_id: "dummyuserid", email: "dummyemail@gmail.com"});
        Meteor.methodMap.productInsert(productAttributes);
        expect(Products.insert).toHaveBeenCalled();
        var insertedParams = Products.insert.calls.mostRecent().args[0];
        expect(insertedParams.author).toEqual("dummyemail@gmail.com");
        expect(insertedParams.userId).toEqual("dummyuserid");
        expect(insertedParams.type).toEqual("integration");
        expect(insertedParams.name).toEqual("test 00");
        expect(insertedParams.price).toEqual(20.99);
    });

    it("should not be be able to update product when no attribute is provided", function () {
        spyOn(Products, "update").and.callThrough();
        Meteor.methodMap.productUpdate(1,{});
        expect(Products.update).not.toHaveBeenCalled();
    });

    it("should not be able to update when there is extra params than name,type and price", function () {
        spyOn(Products, "update").and.callThrough();
        Meteor.methodMap.productUpdate(1,{extra1: 'extra1'});
        expect(Products.update).not.toHaveBeenCalled();
    });

    it("should be able to update", function () {
        spyOn(Products, "update").and.callThrough();
        Meteor.methodMap.productUpdate(1,productAttributes);
        expect(Products.update).toHaveBeenCalled();
    });

});