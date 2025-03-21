# basedcooks.com


## Contributing

1. Place your recipe written in markdown in `/src/content/recipes`.
2. Place any pictures in `/public/pix/`.
3. (Optional) Make an `.json` file about yourself in `/src/content/authors`. This should be your name, lowercase, with hyphens instead of spaces. IE: `Oliver Atkinson` -> `oliver-atkinson.json`. This should be the same name as what you put in the authors section of your recipe. IE: `author: "Oliver Atkinson"`

`author.json` Follows the following schema:
```json
{
    "name": "Your Name",
    "website_tor": "url | null",
    "website": "url | null",
    "email": "email | null",
    "donate": "url | null",
    "xmr": "text | null",
    "btc": "text | null",
    "eth": "text | null"
}
```
If you want another field just let me know in an issue or PR.