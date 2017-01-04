define(['d3', 'mock', 'render/renderForeground'], function (d3, mock) {
    "use strict";

    describe("renderForeground", function () {

        var underTest = Scrollgrid.prototype.internal.render.renderForeground,
            target,
            data;

        beforeEach(function () {
            mock.init();
            d3.init();
            target = new d3.shape(mock.vals);
            data = {
                foregroundStyle: "Foreground Style",
                textHeight: 7,
                textWidth: 13,
                cellPadding: 3,
                rowIndex: 11,
                columnIndex: 13,
                value: 123
            };
        });


        it("should append a text to the target", function () {
            underTest.call(mock, target, data);
            expect(target.children.text).toBeDefined();
        });

        it("should call the get text anchor method", function () {
            underTest.call(mock, target, data);
            expect(mock.internal.render.getTextAnchor).toHaveBeenCalledWith(data);
        });

        it("should apply the text anchor", function () {
            underTest.call(mock, target, data);
            expect(target.children.text[0].styles["text-anchor"]).toEqual("Text Anchor");
        });

        it("should set the y offset", function () {
            underTest.call(mock, target, data);
            expect(target.children.text[0].attributes.dy).toEqual("0.35em");
        });

        it("should call the get text position method", function () {
            underTest.call(mock, target, data);
            expect(mock.internal.render.getTextPosition).toHaveBeenCalledWith(data);
        });

        it("should apply the text position", function () {
            underTest.call(mock, target, data);
            expect(target.children.text[0].attributes.x).toEqual("Text Position");
        });

        it("should set the text to value if no formatter is defined", function () {
            underTest.call(mock, target, data);
            expect(target.children.text[0].textValue).toEqual(123);
        });

        it("should set the text to the formatted value if formatter is defined", function () {
            data.formatter = function (v) { return v * 2; };
            underTest.call(mock, target, data);
            expect(target.children.text[0].textValue).toEqual(246);
        });

        it("should set y to half the height", function () {
            underTest.call(mock, target, data);
            expect(target.children.text[0].attributes.y).toEqual(3.5);
        });

        it("should not call crop text if clip path is functional", function () {
            underTest.call(mock, target, data);
            expect(mock.internal.render.cropText).not.toHaveBeenCalled();
        });

        describe("browsers which don't support clip-path", function () {

            beforeEach(function () {
                mock.internal.render.getClipPath = function () {
                    return "";
                };
            });

            it("should call crop text if clip path is not functional", function () {
                underTest.call(mock, target, data);
                expect(mock.internal.render.cropText).toHaveBeenCalled();
            });

            it("should call crop text with the width minus cell padding if no sort icon is specified", function () {
                underTest.call(mock, target, data);
                expect(mock.internal.render.cropText).toHaveBeenCalledWith(target.children.text[0], data.textWidth - data.cellPadding);
            });

            it("should call crop text with the width minus cell padding if no sort icon is set to none", function () {
                data.sortIcon = 'none';
                underTest.call(mock, target, data);
                expect(mock.internal.render.cropText).toHaveBeenCalledWith(target.children.text[0], data.textWidth - data.cellPadding);
            });

            it("should should take off sort icon size and an additional padding if sort icon is defined", function () {
                data.sortIcon = 'A defined icon';
                underTest.call(mock, target, data);
                expect(mock.internal.render.cropText).toHaveBeenCalledWith(target.children.text[0], data.textWidth - 2 * data.cellPadding - mock.vals.sortIconSize);
            });
        });

    });

});
