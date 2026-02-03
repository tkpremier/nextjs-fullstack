// Create a DOM element with nested children up to 4 levels deep
// Using random HTML tags

const htmlTags = [
  'div',
  'section',
  'article',
  'aside',
  'header',
  'footer',
  'nav',
  'main',
  'span',
  'p',
  'ul',
  'li',
  'h1',
  'h2',
  'h3'
];

function getRandomTag() {
  return htmlTags[Math.floor(Math.random() * htmlTags.length)];
}

function createNestedElement(level = 1, maxLevel = 4) {
  const tag = getRandomTag();
  const element = document.createElement(tag);
  element.textContent = `Level ${level} - ${tag}`;
  element.classList.add(`level-${level}`);

  if (level < maxLevel) {
    // Create 2-3 children at each level
    const numChildren = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < numChildren; i++) {
      const child = createNestedElement(level + 1, maxLevel);
      element.appendChild(child);
    }
  }

  return element;
}

// Create the nested DOM structure and save it to a variable
const nestedDomElement = createNestedElement(1, 4);

// Example: Add some styling to visualize the structure
nestedDomElement.style.border = '2px solid #333';
nestedDomElement.style.padding = '10px';
nestedDomElement.style.margin = '5px';

// Log the structure to console
console.log('Created nested DOM element:', nestedDomElement);

// If you want to append it to the document body:
// document.body.appendChild(nestedDomElement);

// If you want to see the HTML structure:
console.log('HTML Structure:\n', nestedDomElement.outerHTML);

export { nestedDomElement };
