import os

referencedPictures: dict[str, bool] = {}
for p in os.listdir("public/pix"):
    referencedPictures[p] = False

path = "src/content/recipes"

for author in os.listdir(path):
    for recipe in os.listdir(f"{path}/{author}"):

        if recipe.endswith(".md"):
            source = f"{path}/{author}/{recipe}"

            with open(source) as file:
                for line in file.read().splitlines():
                    if "pix" in line:
                        # print(line)
                        linkStart = line.index("](/pix")
                        lineEnd = line.index(")", linkStart)
                        substr = line[linkStart+7:lineEnd]
                        # remove alt text
                        imgName = substr.split(" ")[0]
                        referencedPictures[imgName] = True

for i in referencedPictures:
    if not referencedPictures[i]:
        print(i)
