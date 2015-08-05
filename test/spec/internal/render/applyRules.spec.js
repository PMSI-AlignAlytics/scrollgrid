define(['d3', 'scrollgrid', 'render/applyRules'], function (d3, mock) {
    "use strict";

    describe("applyRules", function () {

        var underTest = Scrollgrid.prototype.internal.render.applyRules,
            data,
            rule;

        beforeEach(function () {
            mock.init();
            d3.init();
            data = [
                { rowIndex: 3, columnIndex: 5 }
            ];
            rule = { row: "4:4", column: "6:6" };
            mock.internal.render.formatRules = [rule];
        });

        it("should not apply any rules if there are no rules set", function () {
            mock.internal.render.formatRules = null;
            underTest.call(mock, data);
            expect(data[0].formatter).not.toBeDefined();
            expect(data[0].alignment).not.toBeDefined();
            expect(data[0].cellPadding).not.toBeDefined();
            expect(data[0].backgroundStyle).not.toBeDefined();
            expect(data[0].foregroundStyle).not.toBeDefined();
        });

        it("should check row and column rules with the match rule method passing index + 1", function () {
            underTest.call(mock, data);
            expect(mock.internal.render.matchRule).toHaveBeenCalledWith(rule.row, data[0].rowIndex + 1, mock.vals.virtOuterHeight);
            expect(mock.internal.render.matchRule).toHaveBeenCalledWith(rule.column, data[0].columnIndex + 1, mock.vals.virtOuterWidth);
        });

        it("should not apply any rules if rules don't match", function () {
            mock.internal.render.matchRule.andReturn(false);
            underTest.call(mock, data);
            expect(data[0].formatter).not.toBeDefined();
            expect(data[0].alignment).not.toBeDefined();
            expect(data[0].cellPadding).not.toBeDefined();
            expect(data[0].backgroundStyle).not.toBeDefined();
            expect(data[0].foregroundStyle).not.toBeDefined();
        });

        it("should apply the formatter if rules match", function () {
            rule.formatter = "Custom Formatter";
            underTest.call(mock, data);
            expect(data[0].formatter).toBeDefined();
            expect(data[0].formatter).toEqual(rule.formatter);
        });

        it("should apply the alignment if rules match", function () {
            rule.alignment = "Custom Alignment";
            underTest.call(mock, data);
            expect(data[0].alignment).toBeDefined();
            expect(data[0].alignment).toEqual(rule.alignment);
        });

        it("should apply the cell padding if rules match", function () {
            rule.cellPadding = "Custom Cell Padding";
            underTest.call(mock, data);
            expect(data[0].cellPadding).toBeDefined();
            expect(data[0].cellPadding).toEqual(rule.cellPadding);
        });

        it("should append the foreground styles if rules match", function () {
            data[0].foregroundStyle = "Existing Foreground Style";
            rule.foregroundStyle = "Custom Foreground Style";
            underTest.call(mock, data);
            expect(data[0].foregroundStyle).toBeDefined();
            expect(data[0].foregroundStyle).toEqual("Existing Foreground Style Custom Foreground Style");
        });

        it("should apply the background styles if rules match", function () {
            data[0].backgroundStyle = "Existing Background Style";
            rule.backgroundStyle = "Custom Background Style";
            underTest.call(mock, data);
            expect(data[0].backgroundStyle).toBeDefined();
            expect(data[0].backgroundStyle).toEqual("Existing Background Style Custom Background Style");
        });

        it("should apply the background render method if rules match", function () {
            rule.renderBackground = "Custom Background Render";
            underTest.call(mock, data);
            expect(data[0].renderBackground).toBeDefined();
            expect(data[0].renderBackground).toEqual("Custom Background Render");
        });

        it("should apply the between render method if rules match", function () {
            rule.renderBetween = "Custom Between Render";
            underTest.call(mock, data);
            expect(data[0].renderBetween).toBeDefined();
            expect(data[0].renderBetween).toEqual("Custom Between Render");
        });

        it("should apply the foreground render method if rules match", function () {
            rule.renderForeground = "Custom Foreground Render";
            underTest.call(mock, data);
            expect(data[0].renderForeground).toBeDefined();
            expect(data[0].renderForeground).toEqual("Custom Foreground Render");
        });

    });

});