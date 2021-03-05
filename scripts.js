const layout = document.querySelector('.container');
let contControls = document.querySelectorAll('[data-props="container"]');
let itemControls = document.querySelectorAll('[data-props="item"]');
let divsToChange = document.querySelector('#apply-to-divs');

let currItems = [];

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
    // applies the change to the div that was clicked last
    let item = currItems[currItems.length -1];
    console.log(currItems);
    console.log(item);
    document.querySelector(item).style[newName] = e.target.value;

    // applies the change to all selected divs
    // currItems.forEach(item => {
    //   console.log(document.querySelector(item))
    //   console.log(e.target.value);
    //   document.querySelector(item).style[newName] = e.target.value;
    // });
  });
})

document.addEventListener('click', e => {
  if (e.target.classList.contains("box")) {
    let items = '.' + e.target.classList[1];
    currItems.push(items);
    currItems = [...new Set(currItems)]; // filter duplicates
    //divsToChange.appendChild(spanItems(currItems)); // TODO: put each item in a span
    
    spanItems(currItems).forEach(item => {
      divsToChange.appendChild(item);
    });
  }
});

const spanItems = (items) => {
  removeAllChildNodes(divsToChange);
  return items.map(item => {
    let span = document.createElement('span');
    span.innerHTML = item;
    return span;
  })
}

//https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}