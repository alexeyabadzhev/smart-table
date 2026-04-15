//import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
//const compare = createComparison(defaultRules);

export function initFiltering(elements) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.value = name;
          el.textContent = name;
          return el;
        }),
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const actionParent = action.parentElement;
      const actionInput = actionParent.querySelector("input");
      actionInput.value = "";
      state.value = "";
    }

    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          filter[`filter[${elements[key].name}]`] = elements[key].value;
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };

  return {
    updateIndexes,
    applyFiltering,
  };
}
