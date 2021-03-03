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

let contControls = document.querySelectorAll('[data-props="container"]');
let itemControls = document.querySelectorAll('[data-props="item"]');

let currItems = [];

// container controls must be handled differently than item controls
contControls.forEach(ctrl => {
  let name = ctrl.name;
  let newName = parseAttrIntoProps(name);
  ctrl.addEventListener('change', e => {
    layout.style[newName] = e.target.value;
  });
});

itemControls.forEach(ctrl => {
  let name = ctrl.name;
  let newName = parseAttrIntoProps(name);
  ctrl.addEventListener('change', e => {
    currItems.forEach(item => {
      item = '.' + item;
      console.log(document.querySelector(item))
      console.log(e.target.value);
      document.querySelector(item).style[newName] = e.target.value;
    });
  });
})

document.addEventListener('click', e => {
  if (e.target.classList.contains("box")) {
    currItems.push(e.target.classList[1]);
    currItems = [...new Set(currItems)]; // filter duplicates
    console.log(currItems);
  }
});