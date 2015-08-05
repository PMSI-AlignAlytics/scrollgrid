define(['scrollgrid', 'dom/setAutoResize'], function (mock) {
    "use strict";

    describe("setAutoResize", function () {

        var underTest = Scrollgrid.prototype.internal.dom.setAutoResize;

        beforeEach(function () {
            mock.init();
            window.onresize = null;
        });

        it("should add a function to the onresize of the window", function () {
            expect(window.onresize).toBeNull();
            underTest.call(mock);
            expect(window.onresize).toBeDefined();
        });

        it("should invoke the refresh method on resize", function () {
            underTest.call(mock);
            window.onresize();
            expect(mock.refresh).toHaveBeenCalled();
        });

        it("should invoke the existing resize method as well if one exists", function () {
            var existingHandler = jasmine.createSpy("existing resize handler");
            window.onresize = existingHandler;
            underTest.call(mock);
            window.onresize();
            expect(existingHandler).toHaveBeenCalled();
            expect(mock.refresh).toHaveBeenCalled();
        });

    });

});