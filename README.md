# [foss.cooking](https://foss.cooking)

The spiritual successor or based.cooking. Luke Smith got the ball rolling but is living a happier life away from computers (probably).


## Contributing

* Inside [this folder](/template/) are the template files for making a new recipe.
* Copy the `json` into `/src/content/authors/`.
* Copy the `md` into `/src/content/recipes/`.
* Place any pictures in the `webp` format in `/public/pix/`

`author.json` Follows the following schema:
```json
// your-name.json
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

The recipe schema is as follows:
```markdown
// a-nice-name.md
---
title: "A nice name"
date: YYYY-MM-DD
tags: ["array", "of", "strings"]
author: "Your Name"
---

Your pretty markdown!
```