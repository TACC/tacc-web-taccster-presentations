// Include dependencies
const fs = require('fs');

// Get data
const json = fs.readFileSync('./assets/_data.json', 'utf8');
let data = JSON.parse(json);

/** Format certain data */
function format(data) {
  data['entries'].forEach( (entry, index) => {
    entry.index = ++index;
    if (entry.institution.list) {
      entry.institution.list = convertListItemsToDictWithIndices(
        entry.institution.list, 'index', 'value'
      );
    }
  });

  return data;
}

/** Convert list to a dictionary and add 'index' prop for each entry */
function convertListItemsToDictWithIndices(list, indexProp, valueProp) {
  const newList = list.map( (item, index) => {
    const newValue = {
      [indexProp]: ++index,
      [valueProp]: item
    };

    return newValue;
  });

  return newList;
}

// Manipulate data
data = format(data);
// console.log(data);

module.exports = data;
