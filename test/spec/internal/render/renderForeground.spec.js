define(['d3', 'mock', 'render/renderForeground'], function (d3, mock) {
    "use strict";

    describe("renderForeground", function () {

        var underTest = Scrollgrid.prototype.internal.render.renderForeground,
            target,
            data,
            ri,
            ci,
            callback;

        beforeEach(function () {
            mock.init();
            d3.init();
            target = new d3.shape(mock.vals);
            data = {
                foregroundStyle: "Foreground Style",
                textHeight: 7,
                rowIndex: 11,
                columnIndex: 13,
                getValue: jasmine.createSpy("getValue method").andCallFake(function (rowIndex, columnIndex, cb) {
                    ri = rowIndex;
                    ci = columnIndex;
                    callback = cb;
                })
            };
        });

        describe("initial text object", function () {

            beforeEach(function () {
                underTest.call(mock, target, data);
            });

            it("should append a text to the target", function () {
                expect(target.children.text).toBeDefined();
            });

            it("should apply the foreground style class", function () {
                expect(target.children.text[0].attributes["class"]).toEqual(data.foregroundStyle);
            });

            it("should call the get text anchor method", function () {
                expect(mock.internal.render.getTextAnchor).toHaveBeenCalledWith(data);
            });

            it("should apply the text anchor", function () {
                expect(target.children.text[0].styles["text-anchor"]).toEqual("Text Anchor");
            });

            it("should set the y offset", function () {
                expect(target.children.text[0].attributes.dy).toEqual("0.35em");
            });

            it("should set the text to a wait string", function () {
                expect(target.children.text[0].textValue).toEqual(mock.vals.cellWaitText);
            });

            it("should call the get text position method", function () {
                expect(mock.internal.render.getTextPosition).toHaveBeenCalledWith(data);
            });

            it("should apply the text position", function () {
                expect(target.children.text[0].attributes.x).toEqual("Text Position");
            });

            it("should set y to half the height", function () {
                expect(target.children.text[0].attributes.y).toEqual(3.5);
            });

            it("should call getValue on the view data", function () {
                expect(data.getValue).toHaveBeenCalledWith(data.rowIndex, data.columnIndex, callback);
                expect(ri).toEqual(data.rowIndex);
                expect(ci).toEqual(data.columnIndex);
            });

        });

        describe("getValue callback with formatter", function () {

            beforeEach(function () {
                data.formatter = jasmine.createSpy("formatter").andReturn("Formatted Value");
                underTest.call(mock, target, data);
                callback("Async Value");
            });

            it("should pass the value to the formatter", function () {
                expect(data.formatter).toHaveBeenCalledWith("Async Value");
            });

            it("should set the text to the formatted value", function () {
                expect(target.children.text[0].textValue).toEqual("Formatted Value");
            });

        });

        it("should set the text to the formatted value when getValue callback without formatter", function () {
            underTest.call(mock, target, data);
            callback("Async Value");
            expect(target.children.text[0].textValue).toEqual("Async Value");
        });

        it("should call crop text with the correct parameters when getValue callback with sortIcon undefined", function () {
            data.cellPadding = 23;
            data.textWidth = 27;
            underTest.call(mock, target, data);
            callback("Async Value");
            expect(mock.internal.render.cropText).toHaveBeenCalledWith(target.children.text[0], data.textWidth - data.cellPadding);
        });

        it("should call crop text with the correct parameters when getValue callback with sortIcon set to none", function () {
            data.cellPadding = 23;
            data.textWidth = 27;
            data.sortIcon = "none";
            underTest.call(mock, target, data);
            callback("Async Value");
            expect(mock.internal.render.cropText).toHaveBeenCalledWith(target.children.text[0], data.textWidth - data.cellPadding);
        });

        it("should call crop text with the correct parameters when getValue callback with sortIcon set", function () {
            data.cellPadding = 23;
            data.textWidth = 27;
            data.sortIcon = "Sort Icon";
            underTest.call(mock, target, data);
            callback("Async Value");
            expect(mock.internal.render.cropText).toHaveBeenCalledWith(target.children.text[0], data.textWidth - mock.vals.sortIconSize - 2 * data.cellPadding);
        });

    });

});