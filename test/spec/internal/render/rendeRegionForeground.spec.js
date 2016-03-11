define(['d3', 'mock', 'render/renderRegionForeground'], function (d3, mock) {
    "use strict";

    describe("renderRegionForeground", function () {

        var underTest = Scrollgrid.prototype.internal.render.renderRegionForeground,
            target;

        beforeEach(function () {
            mock.init();
            d3.init();
            target = new d3.shape(mock.vals);
        });

        it("should call loadDataRange on the adapter", function () {
            underTest.call(mock, "Bounds", target);
            expect(mock.adapter.loadDataRange).toHaveBeenCalled();
        });

        it("should pass bounds to loadDataRange", function () {
            underTest.call(mock, "Bounds", target);
            expect(mock.adapter.loadDataRange.calls.argsFor(0)[0]).toEqual("Bounds");
        });

        describe("loadDataRange callback", function () {

            var data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

            beforeEach(function () {
                underTest.call(mock, "Bounds", target);
                mock.adapter.loadDataRange.calls.argsFor(0)[1](data);
            });

            it("should call each on the cells", function () {
                expect(target.each).toHaveBeenCalled();
            });

            describe("each iterator", function () {

                var each;

                beforeEach(function () {
                    each = target.each.calls.argsFor(0)[0];
                });

                it("should set the value", function () {
                    var params = { visibleRow: 1, visibleColumn: 2, value: null};
                    each(params);
                    expect(params.value).toEqual(6);
                });

                it("should call renderBetween if set", function () {
                    var params = { visibleRow: 1, visibleColumn: 2, value: null, renderBetween: jasmine.createSpy("renderBetween")};
                    each(params);
                    expect(params.renderBetween).toHaveBeenCalled();
                });

                it("should call renderForeground if set", function () {
                    var params = { visibleRow: 1, visibleColumn: 2, value: null, renderForeground: jasmine.createSpy("renderForeground")};
                    each(params);
                    expect(params.renderForeground).toHaveBeenCalled();
                });

            });

        });

    });

});