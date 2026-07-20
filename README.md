# [foss.cooking](https://foss.cooking)


> The spiritual successor to based.cooking. 

Public Domain recipes from around the world!
View them at [foss.cooking](https://foss.cooking)!
If you want to add your own recipe see [contibuting](#contributing).

## New! (2026)

URLs have changed! Instead of finding recipes as such: `https://foss.cooking/recipe/lithuanian-cold-borscht/` you will now find them like:
`https://foss.cooking/recipe/georgii-bondarev/lithuanian-cold-borscht` (includes author's name). This is to help when duplicate recipes exist in the future. This may also require you to **update your bookmarks**! (Your old ones will work for a bit, but will unexpectedly break in the future)

---

## Contributing

1. Fork this repsitory (button in the top right).
1. Clone your repository fork onto your computer.
1. Once it's finished cloning, go to `foss.cooking/src/content/recipes/`.
1. Make a folder that is `your-name`. (You can also put your recipes in `private` if you wish.)
1. Using [this template](/template/dish-name.md) write your recipe, placing it in this folder (`.../your-name/dish-name.md`).
1. (Optional) Copy [this template](/template/author.json), and fill with your info, placing it at `.../your-name/author.json`. Template shown below.
1. Place any pictures in the `webp` format in `/public/pix/`.
1. Add, Commit, and Push your changes to your fork.
1. Submit a Pull request.

Final result:

```txt
foss.cooking/src/content/recipes/
                         └── your-name/
                             ├── dish-name.md
                             └── author.json (optional)
```

---

## Templates

The recipe schema is as follows:

```markdown
// dish-name.md
---
title: "Dish Name"
date: YYYY-MM-DD
tags: ["tag1", "tag2", "etc"]
---

Your recipe, written in markdown
```

`author.json` Follows the following schema:

```json
{
    "name": "Your Name",
    "website_tor": "url | undefined",
    "website": "url | undefined",
    "email": "email | undefined",
    "donate": "url | undefined",
    "xmr": "text | undefined",
    "btc": "text | undefined",
    "eth": "text | undefined"
}
```

If you want another field just let me know in an issue or PR.
