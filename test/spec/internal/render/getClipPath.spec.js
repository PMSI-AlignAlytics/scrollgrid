define(['d3', 'mock', 'render/getClipPath'], function (d3, mock) {
    "use strict";

    describe("getClipPath", function () {

        var underTest = Scrollgrid.prototype.internal.render.getClipPath,
            viewData;

        beforeEach(function () {
            mock.init();
            d3.init();
            viewData = {
                cellPadding: 31,
                textHeight: 230,
                textWidth: 270
            };
        });

        it("Should account for sort icon size if one is present in the view data", function () {
            viewData.sortIcon = "Icon Specified";
            expect(underTest.call(mock, viewData)).toEqual("polygon(0px 0px, 15px 0px, 15px 199px, 0px 199px)");
        });

        it("Should not account for sort icon size if set to none in the view data", function () {
            viewData.sortIcon = "none";
            expect(underTest.call(mock, viewData)).toEqual("polygon(0px 0px, 239px 0px, 239px 199px, 0px 199px)");
        });

        it("Should not account for sort icon size if set to null in the view data", function () {
            viewData.sortIcon = null;
            expect(underTest.call(mock, viewData)).toEqual("polygon(0px 0px, 239px 0px, 239px 199px, 0px 199px)");
        });

    });

});
