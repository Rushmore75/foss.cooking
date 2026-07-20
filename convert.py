import os
from shutil import copyfile
import string
import unicodedata

recipeDir = "content/"
authorsDir = "data/authors"
conversionDir = "out/"

recipes = os.listdir(recipeDir)
os.makedirs(conversionDir, exist_ok=True)
os.makedirs(f'{conversionDir}/private', exist_ok=True)

for recipe in recipes:
    # index is for html, and isn't a recipe
    if "index" in recipe:
        continue

    oldPath = f'{recipeDir}{recipe}'
    newPath = f'{conversionDir}/private/{recipe}'
    # Open the old file and find the author
    with open(oldPath) as contents:
        print("Converting", recipe)
        for line in contents.read().splitlines():
            if line.startswith("author"):
                # Get the authors name and clean it
                authorName = line.split(":")[1].strip()
                # remove (most) fancy characters
                authorName = "".join(
                    c for c in unicodedata.normalize("NFKD", authorName)                
                    if not unicodedata.combining(c)
                    )
                authorName = authorName.replace(" ", "-")
                authorName = authorName.translate(str.maketrans('','', string.punctuation.replace("-", '')))

                # Copy over the author's information
                print("\t", "Author:", authorName)
                authorDirectory = f'{conversionDir}/{authorName}/'
                os.makedirs(authorDirectory, exist_ok=True)
                newPath = f'{authorDirectory}/{recipe}'
                try:
                    copyfile(f"{authorsDir}/{authorName.lower()}.json", f"{authorDirectory}/author.json")
                except FileNotFoundError:
                    # No author is more or less expected
                    pass
        
        # Go back to the beginning of the file
        contents.seek(0)

        # Copy over the recipe
        with open(newPath, "w") as new:
            for line in contents.read().splitlines():
                # Remove the author line
                if line.startswith("author:"):
                    continue
                    
                new.write(line+"\n")

print("\nDone! You can now copy over to your foss.cooking website using:\n\n\tcp -r --update=none out/* ../foss.cooking/src/content/recipes/\n")
print("\tCheck the converted files for links that need updating!\n")