const layout = document.querySelector('.container');
const el = document.getElementById('axis-direction');
const val = el.value;

el.addEventListener('change', e => {
  // DOM changes, but does it render?
  layout.style.flexDirection = e.target.value;
});
