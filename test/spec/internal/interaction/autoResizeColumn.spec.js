define(['scrollgrid_actual', 'scrollgrid_mock'], function (actual, mock) {
    "use strict";

    describe("autoResizeColumn", function () {

        var underTest = actual.prototype.internal.interaction.autoResizeColumn,
            sizes,
            dom;

        beforeEach(function () {
            mock.init();
            sizes = mock.internal.sizes;
            dom = mock.internal.dom;
        });

        it("should not refresh or check width if the parameter is not provided", function () {
            underTest.call(mock);
            expect(sizes.getExistingTextBound).not.toHaveBeenCalled();
            expect(mock.refresh).not.toHaveBeenCalled();
        });

        it("should not refresh or check width if the parameter does not have a column property", function () {
            underTest.call(mock, {columnIndex: 123});
            expect(sizes.getExistingTextBound).not.toHaveBeenCalled();
            expect(mock.refresh).not.toHaveBeenCalled();
        });

        it("should not refresh or check width if the parameter does not have a columnIndex property", function () {
            underTest.call(mock, {column: {}});
            expect(sizes.getExistingTextBound).not.toHaveBeenCalled();
            expect(mock.refresh).not.toHaveBeenCalled();
        });

        describe("when column provided", function () {

            var meta;

            beforeEach(function () {
                meta = {
                    column: {},
                    columnIndex: 123
                };
            });

            describe("external calls", function () {

                beforeEach(function () {
                    underTest.call(mock, meta);
                });

                it("should get the widest cell from the top left svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.top.left.svg, meta.columnIndex);
                });

                it("should get the widest cell from the top svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.top.svg, meta.columnIndex);
                });

                it("should get the widest cell from the top right svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.top.right.svg, meta.columnIndex);
                });

                it("should get the widest cell from the left svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.left.svg, meta.columnIndex);
                });

                it("should get the widest cell from the main svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.main.svg, meta.columnIndex);
                });

                it("should get the widest cell from the right svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.right.svg, meta.columnIndex);
                });

                it("should get the widest cell from the bottom left svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.bottom.left.svg, meta.columnIndex);
                });

                it("should get the widest cell from the bottom svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.bottom.svg, meta.columnIndex);
                });

                it("should get the widest cell from the bottom right svg", function () {
                    expect(sizes.getExistingTextBound).toHaveBeenCalledWith(dom.bottom.right.svg, meta.columnIndex);
                });
            });

            it("should use the top left svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.top.left.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should use the top svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.top.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should use the top right svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.top.right.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should use the left svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.left.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should use the main svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.main.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should use the right svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.right.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should use the bottom left svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.bottom.left.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should use the bottom svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.bottom.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should use the bottom right svg width if it is the widest", function () {
                sizes.getExistingTextBound.andCallFake(function (element) { return { width: (element === dom.bottom.right.svg ? 7 : 5) }; });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(7);
            });

            it("should not set the width to less than zero", function () {
                sizes.getExistingTextBound.andReturn({ width: -123 });
                underTest.call(mock, meta);
                expect(meta.column.width).toEqual(0);
            });

            it("should refresh the grid", function () {
                underTest.call(mock, meta);
                expect(mock.refresh).toHaveBeenCalled();
            });

        });

    });

});