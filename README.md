# [foss.cooking](https://foss.cooking)


The spiritual successor or based.cooking. 

# New! (2026)

URLs have changed! Instead of finding recipes as such: `https://foss.cooking/recipe/lithuanian-cold-borscht/` you will now find them like:
`https://foss.cooking/recipe/georgii-bondarev/lithuanian-cold-borscht` (includes author's name). This is to help when duplicate recipes exist in the future. This may also require you to **update your bookmarks**! (Your old ones will work for a bit, but will unexpectedly break in the future)

### Contributing

1. Go to `src/content/recipes/`
2. Make a folder that is `your-name`. You can also put your recipes in `private` if you wish.
    * (Optionally) Create a file named `author.json` in this folder, and put your info there. (Template shown below)
3. Copying [this file](/template/dish-name.md) write your recipe, placing it in this same folder (`your-name`)
    * The author line should match the parent's folder's name.
4. Place any pictures in the `webp` format in `/public/pix/`

### Templates

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