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
const parseAttrIntoProp = (s) => {
  if (s.includes('-')) {
    let t = s.split('-');
    s = t[0].concat(capitalize(t[1]));
  }
  return s;
}

// container controls must be handled differently than item controls
contControls.forEach(ctrl => {
  let name = parseAttrIntoProp(ctrl.name);
  ctrl.addEventListener('change', e => {
    layout.style[name] = e.target.value;
  });
});

itemControls.forEach(ctrl => {
  let name = parseAttrIntoProp(ctrl.name);
  ctrl.addEventListener('change', e => {
    // applies the change to the div that was clicked last
    // let item = currItems[currItems.length -1];
    // document.querySelector(item).style[name] = e.target.value;

    // applies the change to all selected divs
    currItems.forEach(item => {
      document.querySelector(item).style[name] = e.target.value;
    });
  });
});

document.addEventListener('click', e => {
  if (e.target.classList.contains("box")) {
    let items = '.' + e.target.classList[1];
    currItems.push(items);
    currItems = [...new Set(currItems)]; // filter duplicates
    spanItems(currItems).forEach(item => {
      divsToChange.appendChild(item);
    });
  }
});

// undo selection
divsToChange.addEventListener('click', e => {
  let i = currItems.findIndex(val => val === e.target.id);
  if (i !== -1) {
    currItems.splice(i, 1);
    console.log(currItems);
    divsToChange.removeChild(e.target); // would this step be necessary in MV* framework w/ data-binding?
  }
});

//https://www.w3schools.com/jsref/dom_obj_style.asp
const spanItems = items => {
  removeAllChildNodes(divsToChange);
  return items.map(item => {
    let span = document.createElement('span');
    let num = getLastChar(item);
    span.style.backgroundColor = getColor(item);
    span.style.padding = "3px";
    span.innerHTML = num;
    span.id = item;
    return span;
  })
}

const getLastChar = item => {
  let num = item.length - 1;
  return item.charAt(num);
}


//https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
const removeAllChildNodes = parent => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

// style properties return empty strings unless you first assign them from javascript
//https://stackoverflow.com/q/10556185
const getColor = item => {
  let el = document.querySelector(item);
  return window.getComputedStyle(el).backgroundColor;
}