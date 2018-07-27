const getFieldset = (form) => {
  return Array.from(form).filter(element => element.type === 'fieldset');
};

const convertFieldsetDataToJSON = (fieldsets) => {
  let obj = {};

  for (let i = 0; i < fieldsets.length; i++) {
    const elements = fieldsets[i].elements;
    const filename = elements[0].value;
    const content = elements[elements.length - 1].value;

    obj[filename] = { content };
  }

  return obj;
}


export { getFieldset, convertFieldsetDataToJSON };
