import { createElement, insertElement } from "./utils.js";

// Elements
const container = document.querySelector(".sections");
const section = createElement("section");
const data = await fetch("./data/main.json")
	.then((data) => data.json())
	.then((data) => data);

// Hydratation
Object.keys(data).map((key) => {
	const { title, subtitles, id } = data[key];
	const sectionContainer = createElement("div");
	const titleElement = createElement("h2");

	insertElement({
		element: titleElement,
		textContent: title,
		id,
		parent: sectionContainer,
	});
	section.appendChild(sectionContainer);

	if (subtitles) {
		for (const subtitleObject of subtitles) {
			const { id: subtitleId, subtitle, items, textContent } = subtitleObject;
			const subtitleElement = createElement("h3");

			insertElement({
				element: subtitleElement,
				textContent: subtitle,
				id: subtitleId,
				parent: sectionContainer,
			});

			if (textContent) {
				insertElement({
					element: createElement("p"),
					textContent,
					parent: sectionContainer,
				});
			}

			if (items) {
				for (const itemObject of items) {
          const { item, id: itemId, textContent: itemTextContent } = itemObject;
          const itemElement = createElement("h4");
          const paragraphElement = createElement("p");

          insertElement({
            element: itemElement,
            id: itemId,
            textContent: item,
            parent: sectionContainer,
          });

          insertElement({
            element: paragraphElement,
            textContent: itemTextContent,
            parent: sectionContainer,
          });
				}
			}
		}
	}
});

container.appendChild(section);
