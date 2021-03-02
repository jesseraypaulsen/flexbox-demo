const layout = document.querySelector('.container');

// https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// parse the style attribute strings into the corresponding property from JS/DOM
const parseAttrIntoProps = (s) => {
  if (s.includes('-')) {
    let t = s.split('-');
    s = t[0].concat(capitalize(t[1]));
  }
  return s;
}
const ddlists = document.querySelectorAll('select');

ddlists.forEach(list => {
  let name = list.name;
  let newName = parseAttrIntoProps(name);
  list.addEventListener('change', e => {
    layout.style[newName] = e.target.value;
  });
});