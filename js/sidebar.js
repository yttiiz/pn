import { createElement } from "./utils.js";

// Elements
const sidebar = document.querySelector(".sidebar");
const data = await fetch("./data/sidebar.json")
	.then((data) => data.json())
	.then((data) => data);

// Hydratation
Object.keys(data).map((key) => {
	let index = 1;

	for (const titleItem of data[key]) {
		const mainItem = createElement("ul");
		const mainLink = createElement("a");

		if (titleItem.subtitles.length) {
			mainLink.textContent = `${index} - ${titleItem.title}`;
			mainLink.href = titleItem.href;
			mainItem.appendChild(mainLink);

			for (const subtitleKey of Object.keys(titleItem.subtitles[0])) {
				const subtitleItem = titleItem.subtitles[0][subtitleKey];
				const secondaryList = createElement("li");

				if (subtitleItem.content.length) {
					const item = createElement("ul");
					const link = createElement("a");

					link.textContent = subtitleItem.subtitle;
					link.href = subtitleItem.href;

					item.appendChild(link);
					secondaryList.appendChild(item);

					for (const lastItem of subtitleItem.content) {
						const tercaryItem = createElement("li");
						const tercaryLink = createElement("a");

						tercaryLink.textContent = lastItem.item;
						tercaryLink.href = lastItem.href;

						tercaryItem.appendChild(tercaryLink);
						item.appendChild(tercaryItem);
					}

					mainItem.appendChild(secondaryList);
				} else {
					//
				}
			}
		} else {
			mainLink.href = titleItem.href;
			mainLink.textContent = titleItem.title;

			mainItem.appendChild(mainLink);
		}

		sidebar.appendChild(mainItem);

		index++;
	}
});
