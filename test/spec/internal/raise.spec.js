define(['scrollgrid', 'internal/raise'], function (mock) {
    "use strict";

    describe("raise", function () {

        var underTest = Scrollgrid.prototype.internal.raise;

        beforeEach(function () {
            mock.init();
        });

        it("should use the reporter on the context if provided", function () {
            underTest.call(mock, "Example Message");
            expect(mock.reporter.error).toHaveBeenCalledWith("Example Message");
        });

        it("should use the console if no reporter is provided", function () {
            var errSpy = spyOn(console, 'error');
            delete mock.reporter;
            underTest.call(mock, "Example Message");
            expect(errSpy).toHaveBeenCalledWith("Example Message");
        });

        it("should throw an exception if console is not supported in the current environment", function () {
            expect(function () {
                delete mock.reporter.error;
                underTest.call(mock, "Example Message");
            }).toThrow("Example Message");
        });

    });

});