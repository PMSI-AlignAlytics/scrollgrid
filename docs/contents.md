### Contents

* [Getting Started](gettingStarted.md)
* [Grid Options](gridOptions.md)
* [Advanced Styling](advancedStyling.md)
* [React Wrapper](react.md)

Internal modules under `src/dom`, `src/render`, `src/sizes` and
`src/interaction` are no longer a stable API — they were previously
exposed via `Scrollgrid.internal.*` for backwards compatibility, but the
ES module rewrite turns them into private implementation detail. If you
were depending on one of them, please open an issue describing the use
case so we can promote a stable equivalent.
