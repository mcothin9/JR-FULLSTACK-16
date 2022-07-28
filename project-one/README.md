# Some useful css hints

All block element has a default width (height) 100%

1. percentage: relate to parent size

2. em: relate to parent size ->
```css
body {
    font-size: 20px;
}

.container {
    font-size: 0.5em;
}
```
the `body` is parent block of container, so font size of container is 10px (half of 20px)
**It may become matter if have serveral embedded block...**

3. rem (root Em) -> only relate to the root

## Recommendation usage

Font-size = rem
Padding and margin = em
Widths = em or percentage