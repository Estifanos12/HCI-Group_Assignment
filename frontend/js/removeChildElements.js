const removeChildElements = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
