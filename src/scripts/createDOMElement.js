function addClasses(classes, element) {
  const currentElement = element;

  if (classes) {
    currentElement.classList.add(...classes.split(' '));
  }
  return currentElement;
}

function addChildren(children, element) {
  const currentElement = element;

  if (children && Array.isArray(children)) {
    children.forEach(childElement => childElement && currentElement.appendChild(childElement));
  } else if (children && typeof children === 'object') {
    currentElement.appendChild(children);
  } else if (children && typeof children === 'string') {
    currentElement.innerHTML = children;
  }
  return currentElement;
}

function addParent(parent, element) {
  return parent ? parent.appendChild(element) : null;
}

export default function createDOMElement(elementData) {
  let currentElement = null;

  currentElement = document.createElement(elementData.elementName);
  currentElement = addClasses(elementData.classNames, currentElement);
  currentElement = addChildren(elementData.children, currentElement);
  currentElement = addParent(elementData.parent, currentElement);
  return currentElement;
}
