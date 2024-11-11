import { createElement, insertElement } from "./utils.js";

// Elements
const container = document.querySelector(".sections");
const section = createElement("section");
section.id = "slides";

const data = await fetch("./data/main.json")
	.then((data) => data.json())
	.then((data) => data);

// Hydratation
Object.keys(data).map((key, index) => {
	const { title, subtitles, image, id } = data[key];
	const slideContainer = createElement("div");
	const titleElement = createElement("h2");

	slideContainer.classList.add("slide-container");

	insertElement({
		element: titleElement,
		textContent: title,
		id,
		parent: slideContainer,
	});

	section.appendChild(slideContainer);

  if (image) {
    const { src, alt } = image;
    const imageElement = createElement("img");
    imageElement.src = src;
    imageElement.alt = alt;

    slideContainer.appendChild(imageElement);
  }

	if (subtitles) {
		for (const subtitleObject of subtitles) {
			const { id: subtitleId, subtitle, items, textContent } = subtitleObject;
			const subtitleElement = createElement("h3");

			insertElement({
				element: subtitleElement,
				textContent: subtitle,
				id: subtitleId,
				parent: slideContainer,
			});

			if (textContent) {
				insertElement({
					element: createElement("p"),
					textContent,
					parent: slideContainer,
				});
			}

			if (items) {
				for (const itemObject of items) {
					const { item, id: itemId, textContent: itemTextContent, figures } = itemObject;
					const itemElement = createElement("h4");
					const paragraphElement = createElement("p");

					insertElement({
						element: itemElement,
						id: itemId,
						textContent: item,
						parent: slideContainer,
					});

          if (figures) {
            for ( const figure of figures) {
              const itemImageElement = createElement("img");
              const figureContainer = createElement("figure");
              const { textContent: figureTextContent, image: { src, alt } } = figure;
              
              itemImageElement.src = src;
              itemImageElement.alt = alt;
  
              if (figureTextContent) {
                const figcaptionElement = createElement("figcaption");

                insertElement({
                  element: figcaptionElement,
                  textContent: figureTextContent,
                  parent: figureContainer,
                });
              }
  
              figureContainer.appendChild(itemImageElement);
              slideContainer.appendChild(figureContainer);
            }

          } else {
            insertElement({
              element: paragraphElement,
              textContent: itemTextContent,
              parent: slideContainer,
            });
          }

				}
			}
		}

		// Add a number to the slide.
		const slideNumber = createElement("span");

		slideNumber.textContent = index + 1;
    slideNumber.classList.add("slide-number");

		slideContainer.appendChild(slideNumber);
	}
});

container.appendChild(section);
