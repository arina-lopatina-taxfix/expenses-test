# ABC ROM webfont files go here

Drop the following files into this folder (they're referenced from
`src/ds/tokens.css` via `/fonts/abc-rom/...`):

| Weight  | woff2                  | woff (optional fallback) |
| ------- | ---------------------- | ------------------------ |
| Regular | `ABCROM-Regular.woff2` | `ABCROM-Regular.woff`    |
| Medium  | `ABCROM-Medium.woff2`  | `ABCROM-Medium.woff`     |
| Bold    | `ABCROM-Bold.woff2`    | `ABCROM-Bold.woff`       |

The `.woff` files are optional — modern browsers will use the `.woff2`.

ABC ROM is a commercial typeface from ABC Dinamo. If you keep the source
files in a private Taxfix repo, pull them down and copy here, e.g.:

```
gh repo clone taxfix/<font-repo>
cp <font-repo>/dist/ABCROM-*.woff2 public/fonts/abc-rom/
```

After dropping the files in, Vite will pick them up on the next build —
no code change required.
