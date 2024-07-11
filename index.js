
const handleMap = {
  ellipsis:handleEllipsis, 
  words:handleExpandWords, 
  arrow:handleExpandArrow
};
export default function multilineTextOverflow({eleId, foldLines=2, handleType='ellipsis'}) {
  if(typeof(eleId)!=='string') {
    console.error('eleId must be dom element id');
    return
  }
  const element = document.getElementById(eleId);
  const elementStyle = window.getComputedStyle(element, null);

  const shadowElement = document.createElement('div');
  shadowElement.innerText = element.innerText;
  shadowElement.style.position = 'absolute';
  shadowElement.style.visibility = 'hidden';
  shadowElement.style.top = '-10000px';
  element.appendChild(shadowElement);

  const shadowElementStyle = window.getComputedStyle(shadowElement, null);

  const sHeight = parseFloat(shadowElementStyle.height);
  const eFoldHeight = parseFloat(elementStyle.lineHeight)*foldLines;
  element.removeChild(shadowElement);
  if(sHeight>eFoldHeight) {
    element.style.maxHeight = eFoldHeight+'px';
    element.style.overflow  = 'hidden';
    element.style.position = 'relative';
    handleMap[handleType](
      {
        element,
        elementStyle,
        maxHeight: eFoldHeight+'px'
      }
    );
    return true;
  }
  return false;
}

// handleType:1
function handleEllipsis({
  element,
  elementStyle
}) {
  const ellipsisElement = document.createElement('div');
  ellipsisElement.innerText = '···';
  ellipsisElement.style.position = 'absolute';
  ellipsisElement.style.bottom = '0px';
  ellipsisElement.style.right = '0px';
  ellipsisElement.style.padding = '0px 3px';
  ellipsisElement.style.backgroundColor = elementStyle.backgroundColor || 'white';
  element.appendChild(ellipsisElement);
}

// handleType:2
function handleExpandWords({
  element,
  elementStyle,
  maxHeight
}) {
  const ellipsisElement = document.createElement('div');
  ellipsisElement.innerText = '···';

  const wordsElement = document.createElement('span');
  wordsElement.innerText = '展开';
  wordsElement.style.color = 'rgb(16, 84, 219)';
  ellipsisElement.appendChild(wordsElement);

  ellipsisElement.style.position = 'absolute';
  ellipsisElement.style.bottom = '0px';
  ellipsisElement.style.right = '0px';
  ellipsisElement.style.padding = '0px 3px';
  ellipsisElement.style.backgroundColor = elementStyle.backgroundColor || 'white';
  ellipsisElement.style.cursor = 'pointer';
  element.appendChild(ellipsisElement);

  ellipsisElement.addEventListener('click', function() {
    element.style.maxHeight = 'none';
    handleFoldWords({
      element,
      elementStyle,
      maxHeight
    });
    element.removeChild(ellipsisElement);
  });
}
function handleFoldWords({
  element,
  elementStyle,
  maxHeight
}) {
  const foldElement = document.createElement('span');
  foldElement.innerText = '收起';
  foldElement.style.color = 'rgb(16, 84, 219)';

  foldElement.style.padding = '0px 3px';
  foldElement.style.backgroundColor = elementStyle.backgroundColor || 'white';
  foldElement.style.cursor = 'pointer';
  element.appendChild(foldElement);

  foldElement.addEventListener('click', function() {
    element.style.maxHeight = maxHeight;
    element.removeChild(foldElement);
    handleExpandWords({
      element,
      elementStyle,
      maxHeight
    });
  });
}

// handleType:3
function handleExpandArrow({
  element,
  elementStyle,
  maxHeight
}) {
  const arrowElement = document.createElement('div');
  arrowElement.innerHTML = '<svg t="1720688824343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1168" width="25" height="25"><path d="M311.168 396.501333a42.666667 42.666667 0 0 1 60.330667 0L512 537.002667l140.501333-140.501334a42.666667 42.666667 0 1 1 60.330667 60.330667l-170.666667 170.666667a42.666667 42.666667 0 0 1-60.330666 0l-170.666667-170.666667a42.666667 42.666667 0 0 1 0-60.330667z" p-id="1169" fill="rgb(16, 84, 219)"></path></svg>';

  arrowElement.style.padding = '0px 3px';
  arrowElement.style.cursor = 'pointer';
  arrowElement.style.textAlign = 'center';
  element.insertAdjacentElement("afterend", arrowElement);

  arrowElement.addEventListener('click', function() {
    element.style.maxHeight = 'none';
    handleFoldArrow({
      element,
      elementStyle,
      maxHeight
    });
    arrowElement.remove();
  });
}
function handleFoldArrow({
  element,
  elementStyle,
  maxHeight
}) {
  const foldElement = document.createElement('div');
  foldElement.innerHTML = '<svg t="1720688904777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1408" width="25" height="25"><path d="M481.834667 396.501333a42.666667 42.666667 0 0 1 60.330666 0l170.666667 170.666667a42.666667 42.666667 0 0 1-60.330667 60.330667L512 486.997333l-140.501333 140.501334a42.666667 42.666667 0 0 1-60.330667-60.330667l170.666667-170.666667z" p-id="1409" fill="rgb(16, 84, 219)"></path></svg>';

  foldElement.style.padding = '0px 3px';
  foldElement.style.cursor = 'pointer';
  foldElement.style.textAlign = 'center';
  element.insertAdjacentElement("afterend", foldElement);

  foldElement.addEventListener('click', function() {
    element.style.maxHeight = maxHeight;
    foldElement.remove();
    handleExpandArrow({
      element,
      elementStyle,
      maxHeight
    });
  });
}