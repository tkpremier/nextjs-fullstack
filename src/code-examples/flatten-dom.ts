// implement a util that takes a DOM node and returns a flattened array of DOM elements
// ensure typesafety
const flattenedArray: Node[] = [];

export const flattenDOMTree = (node: Node): Node[] => {
  flattenedArray.push(node);
  if (node.hasChildNodes()) {
    const childNodesArray = Array.from(node.childNodes).filter(cN => cN.nodeType === 1);
  }
  return flattenedArray;
};
