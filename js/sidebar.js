// Elements
const sidebar = document.querySelector(".sidebar");
const data = await fetch("./data/data.json")
	.then((data) => data.json())
	.then((data) => data);

// Hydratation
Object.keys(data).map((key, index) => {
	for (const titleItem of data[key]) {
		const mainItem = document.createElement("ul");
		const mainLink = document.createElement("a");

		if (titleItem.subtitles.length) {
			mainLink.textContent = `${index >= 10 ? index + 1 : `0${index + 1}`} - ${titleItem.title}`;
			mainLink.href = titleItem.href;
			mainItem.appendChild(mainLink);

			for (const subtitleKey of Object.keys(titleItem.subtitles[0])) {
				const subtitleItem = titleItem.subtitles[0][subtitleKey];
				const secondaryList = document.createElement("li");

				if (subtitleItem.content.length) {
					const item = document.createElement("ul");
					const link = document.createElement("a");

					link.textContent = subtitleItem.subtitle;
					link.href = subtitleItem.href;

					item.appendChild(link);
					secondaryList.appendChild(item);

					for (const lastItem of subtitleItem.content) {
						const tercaryItem = document.createElement("li");
						const tercaryLink = document.createElement("a");

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
	}
});
