define(['mock', 'dom/stylePanels'], function (mock) {
    "use strict";

    describe("stylePanels", function () {

        var underTest = Scrollgrid.prototype.internal.dom.stylePanels,
            newStyle,
            elems;

        beforeEach(function () {
            mock.init();
            newStyle = {
                left: { panel: 'new left' },
                right: { panel: 'new right' },
                top: { panel: 'new top', left: { panel: 'new top left' }, right: { panel: 'new top right' } },
                bottom: { panel: 'new bottom', left: { panel: 'new bottom left' }, right: { panel: 'new bottom right' } },
                main: { panel: 'new main' }
            };
            elems = mock.elements;
        });

        it("should keep the styles if no parameter is passed", function () {
            underTest.call(mock);
            expect(mock.style.top.left.panel).toEqual('top left');
            expect(mock.style.top.panel).toEqual('top');
            expect(mock.style.top.right.panel).toEqual('top right');
            expect(mock.style.left.panel).toEqual('left');
            expect(mock.style.main.panel).toEqual('main');
            expect(mock.style.right.panel).toEqual('right');
            expect(mock.style.bottom.left.panel).toEqual('bottom left');
            expect(mock.style.bottom.panel).toEqual('bottom');
            expect(mock.style.bottom.right.panel).toEqual('bottom right');
        });

        it("should replace the styles if a parameter is passed", function () {
            underTest.call(mock, newStyle);
            expect(mock.style.top.left.panel).toEqual('new top left');
            expect(mock.style.top.panel).toEqual('new top');
            expect(mock.style.top.right.panel).toEqual('new top right');
            expect(mock.style.left.panel).toEqual('new left');
            expect(mock.style.main.panel).toEqual('new main');
            expect(mock.style.right.panel).toEqual('new right');
            expect(mock.style.bottom.left.panel).toEqual('new bottom left');
            expect(mock.style.bottom.panel).toEqual('new bottom');
            expect(mock.style.bottom.right.panel).toEqual('new bottom right');
        });

        it("should set the class of the top left panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.top.left.svg.attributes.class).toEqual('top left');
        });

        it("should set the class of the top left panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.top.left.svg.attributes.class).toEqual('new top left');
        });

        it("should set the class of the top panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.top.svg.attributes.class).toEqual('top');
        });

        it("should set the class of the top panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.top.svg.attributes.class).toEqual('new top');
        });

        it("should set the class of the top right panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.top.right.svg.attributes.class).toEqual('top right');
        });

        it("should set the class of the top right panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.top.right.svg.attributes.class).toEqual('new top right');
        });

        it("should set the class of the left panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.left.svg.attributes.class).toEqual('left');
        });

        it("should set the class of the left panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.left.svg.attributes.class).toEqual('new left');
        });

        it("should set the class of the main panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.main.svg.attributes.class).toEqual('main');
        });

        it("should set the class of the main panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.main.svg.attributes.class).toEqual('new main');
        });

        it("should set the class of the right panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.right.svg.attributes.class).toEqual('right');
        });

        it("should set the class of the right panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.right.svg.attributes.class).toEqual('new right');
        });

        it("should set the class of the bottom left panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.bottom.left.svg.attributes.class).toEqual('bottom left');
        });

        it("should set the class of the bottom left panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.bottom.left.svg.attributes.class).toEqual('new bottom left');
        });

        it("should set the class of the bottom panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.bottom.svg.attributes.class).toEqual('bottom');
        });

        it("should set the class of the bottom panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.bottom.svg.attributes.class).toEqual('new bottom');
        });

        it("should set the class of the bottom right panel to the old style if none is passed", function () {
            underTest.call(mock);
            expect(elems.bottom.right.svg.attributes.class).toEqual('bottom right');
        });

        it("should set the class of the bottom right panel to the new style if one is passed", function () {
            underTest.call(mock, newStyle);
            expect(elems.bottom.right.svg.attributes.class).toEqual('new bottom right');
        });
    });
});
