define(['d3', 'scrollgrid_actual', 'scrollgrid_mock'], function (d3, actual, mock) {
    "use strict";

    describe("renderSortIcon", function () {

        var underTest = actual.prototype.internal.render.renderSortIcon,
            target,
            datum;

        beforeEach(function () {
            mock.init();
            d3.init();
            datum = {
                sortIcon: "Sort Icon",
                textWidth: 3,
                textHeight: 5,
                cellPadding: 7
            };
            target = new d3.shape();
        });

        it("should not append a group if sorted is false", function () {
            underTest.call(mock, datum, target, false);
            expect(target.children.g).toBeUndefined();
        });

        it("should not append a group if text width is narrower than sort icon size and cell padding", function () {
            datum.textWidth = mock.vals.sortIconSize + datum.cellPadding;
            underTest.call(mock, datum, target, true);
            expect(target.children.g).toBeUndefined();
        });

        describe("text width is wider than the sort icon", function () {

            beforeEach(function () {
                datum.textWidth = mock.vals.sortIconSize + datum.cellPadding + 1;
                underTest.call(mock, datum, target, true);
            });

            it("should append a group", function () {
                expect(target.children.g).toBeDefined();
                expect(target.children.g.length).toEqual(1);
            });

            it("should pass the sort icon as a datum", function () {
                expect(target.children.g[0].dataPoint).toEqual("Sort Icon");
            });

            it("should class it with a selector", function () {
                expect(target.children.g[0].attributes["class"]).toEqual("sg-no-style--sort-icon-selector");
            });

            it("should position it with a transform", function () {
                expect(target.children.g[0].attributes.transform).toEqual("translate(" + (datum.cellPadding + mock.vals.sortIconSize / 2) + "," + (datum.textHeight / 2) + ")");
            });

            it("should call the sort icon method", function () {
                expect(target.children.g[0].call).toHaveBeenCalled();
                target.children.g[0].call.mostRecentCall.args[0]("Data Point");
                expect(mock.internal.render.sortIcon).toHaveBeenCalledWith("Data Point");
            });

        });


    });

});