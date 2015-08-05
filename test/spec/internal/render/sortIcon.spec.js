define(['d3', 'scrollgrid', 'render/sortIcon'], function (d3, mock) {
    "use strict";

    describe("sortIcon", function () {

        var underTest = Scrollgrid.prototype.internal.render.sortIcon,
            target;

        beforeEach(function () {
            mock.init();
            d3.init();
            target = new d3.shape(mock.vals);
            mock.internal.render.sortIconSize = 2;
        });

        it("should append a path", function () {
            underTest.call(mock, target);
            expect(target.children.path).toBeDefined();
        });

        it("should apply the sort icon class", function () {
            underTest.call(mock, target);
            expect(target.children.path[0].attributes["class"]).toEqual(mock.style.sortIcon);
        });

        it("should draw an up arrow if sort is ascending", function () {
            target.dataPoint = "asc";
            underTest.call(mock, target);
            expect(target.children.path[0].attributes.d).toEqual("M 1 0 L 2 2 L 0 2 z");
        });

        it("should draw a down arrow if sort is descending", function () {
            target.dataPoint = "desc";
            underTest.call(mock, target);
            expect(target.children.path[0].attributes.d).toEqual("M 0 0 L 2 0 L 1 2 z");
        });

        it("should not set the data element is direction is not set", function () {
            target.dataPoint = null;
            underTest.call(mock, target);
            expect(target.children.path[0].attributes.d).toBeUndefined();
        });

        it("should center the icon around (0, 0)", function () {
            underTest.call(mock, target);
            expect(target.children.path[0].attributes.transform).toEqual("translate(" + (mock.vals.boundingBoxWidth / -2) + "," + (mock.vals.boundingBoxHeight / -2) + ")");
        });

    });

});