/**
 * @param {HTMLElementTagNameMap} selector
 */
export const createElement = (selector) => document.createElement(selector);

/**
 * @param {{
 * element: HTMLElement;
 * textContent: string;
 * id: string;
 * parent: HTMLElement;
 * }} 
 */
export const insertElement = ({ element, textContent, id, parent }) => {
  if (id) {
    element.id = id;
  }
  
  if (textContent.includes("\n")) {
    textContent = textContent.replaceAll("\n", "<br />");
    element.innerHTML = textContent;

  } else {
    element.textContent = textContent;
  }

  parent.appendChild(element);
}