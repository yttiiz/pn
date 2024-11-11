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
  element.textContent = textContent;
  if (id) {
    element.id = id;
  }

  parent.appendChild(element);
}