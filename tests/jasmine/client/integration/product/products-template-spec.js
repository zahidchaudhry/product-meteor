describe("Product templates", function() {

    it("should show a list of products when there are some available", function () {
        var div = document.createElement("DIV");
        var data = {products: [
            {name: 'test 1', type: 'integration', price: 20.99},
            {name: 'test 2', type: 'integration2', price: 30.99}]}
        var comp = Blaze.renderWithData(Template.productsList, data);

        Blaze.insert(comp, div);

        expect($(div).find("tr").length).toEqual(3);
    });

    it("should show logout button", function () {
        // login to system and wait for callback
        Meteor.loginWithPassword("zahid.ali@tkxel.com", "tkxel1234", function(err) {
            // check if we have correctly logged in the system
            expect(err).toBeUndefined();
            var div = document.createElement("DIV");
            var comp = Blaze.renderWithData(Template.productsList, {});
            Blaze.insert(comp, div);
            expect($(div).find(".js-logout")[0]).toBeDefined();
        });
    });

});