
const handleMap = {
  ellipsis:handleEllipsis, 
  words:handleExpandWords, 
  arrow:handleExpandArrow
};

const DomElementsMap = {};
const defaultColor = 'rgb(16, 84, 219)';
export default function multilineTextOverflow(options) {
  const {eleId, foldLines, handleType} = {
    foldLines: 2,
    handleType:'ellipsis',
    ...options,
  }
  if(typeof(eleId)!=='string') {
    console.error('eleId must be dom element id');
    return
  }

  const element = document.getElementById(eleId);
  const elementStyle = window.getComputedStyle(element, null);

  const sHeight = parseFloat(elementStyle.height);
  const eFoldHeight = parseFloat(elementStyle.lineHeight)*foldLines;

  // 判断是否需要做溢出处理
  if(sHeight>eFoldHeight) {
    element.style.maxHeight = eFoldHeight+'px';
    element.style.overflow  = 'hidden';
    element.style.position = 'relative';

    // 初始化多行文本容器对象
    DomElementsMap[eleId] = {
      element,
      elementStyle,
      maxHeight: eFoldHeight+'px',
      originHeight: sHeight+'px',
      lineHeight: elementStyle.lineHeight,
      ifAnimation: options.ifAnimation===false ? false : true,
      color: options.color || defaultColor,
      backgroundColor: options.backgroundColor || elementStyle.backgroundColor || 'white',
    }
    handleMap[handleType](eleId);
    return true;
  }
  return false;
}

// handleType:1
function handleEllipsis(eleId) {
  const {element, elementStyle, backgroundColor} = DomElementsMap[eleId]
  const ellipsisElement = document.createElement('div');
  ellipsisElement.innerText = '···';
  ellipsisElement.style.position = 'absolute';
  ellipsisElement.style.bottom = '0px';
  ellipsisElement.style.right = '0px';
  ellipsisElement.style.padding = '0px 3px';
  ellipsisElement.style.backgroundColor = backgroundColor;
  element.appendChild(ellipsisElement);
}

// handleType:2
function handleExpandWords(eleId) {
  const {element, color, backgroundColor} = DomElementsMap[eleId]

  const ellipsisElement = document.createElement('div');
  ellipsisElement.innerText = '···';

  const wordsElement = document.createElement('span');
  wordsElement.innerText = '展开';
  wordsElement.style.color = color;
  ellipsisElement.appendChild(wordsElement);

  ellipsisElement.style.position = 'absolute';
  ellipsisElement.style.bottom = '0px';
  ellipsisElement.style.right = '0px';
  ellipsisElement.style.padding = '0px 3px';
  ellipsisElement.style.backgroundColor = backgroundColor;
  ellipsisElement.style.cursor = 'pointer';
  element.appendChild(ellipsisElement);

  ellipsisElement.addEventListener('click', function() {
    toggleHeightAnimation(eleId, 'expand')
    handleFoldWords(eleId);
    element.removeChild(ellipsisElement);
  });
}
function handleFoldWords(eleId) {
  const {element, color, backgroundColor} = DomElementsMap[eleId]

  const foldElement = document.createElement('span');
  foldElement.innerText = '收起';
  foldElement.style.color = color;

  foldElement.style.padding = '0px 3px';
  foldElement.style.backgroundColor = backgroundColor;
  foldElement.style.cursor = 'pointer';
  element.appendChild(foldElement);

  foldElement.addEventListener('click', function() {
    //element.style.maxHeight = maxHeight;
    toggleHeightAnimation(eleId, 'fold')
    element.removeChild(foldElement);
    handleExpandWords(eleId);
  });
}

// handleType:3
function handleExpandArrow(eleId) {
  const {element, color, backgroundColor} = DomElementsMap[eleId]

  const arrowElement = document.createElement('div');
  arrowElement.innerHTML = '<svg t="1720688824343" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1168" width="25" height="25"><path d="M311.168 396.501333a42.666667 42.666667 0 0 1 60.330667 0L512 537.002667l140.501333-140.501334a42.666667 42.666667 0 1 1 60.330667 60.330667l-170.666667 170.666667a42.666667 42.666667 0 0 1-60.330666 0l-170.666667-170.666667a42.666667 42.666667 0 0 1 0-60.330667z" p-id="1169" fill="'+color+'"></path></svg>';

  arrowElement.style.padding = '0px 3px';
  arrowElement.style.cursor = 'pointer';
  arrowElement.style.textAlign = 'center';
  arrowElement.style.backgroundColor = backgroundColor;
  element.insertAdjacentElement("afterend", arrowElement);

  arrowElement.addEventListener('click', function() {
    toggleHeightAnimation(eleId, 'expand')
    handleFoldArrow(eleId);
    arrowElement.remove();
  });
}
function handleFoldArrow(eleId) {
  const {element, color, backgroundColor} = DomElementsMap[eleId]

  const foldElement = document.createElement('div');
  foldElement.innerHTML = '<svg t="1720688904777" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1408" width="25" height="25"><path d="M481.834667 396.501333a42.666667 42.666667 0 0 1 60.330666 0l170.666667 170.666667a42.666667 42.666667 0 0 1-60.330667 60.330667L512 486.997333l-140.501333 140.501334a42.666667 42.666667 0 0 1-60.330667-60.330667l170.666667-170.666667z" p-id="1409" fill="'+color+'"></path></svg>';

  foldElement.style.padding = '0px 3px';
  foldElement.style.cursor = 'pointer';
  foldElement.style.textAlign = 'center';
  foldElement.style.backgroundColor = backgroundColor;
  element.insertAdjacentElement("afterend", foldElement);

  foldElement.addEventListener('click', function() {
    // element.style.maxHeight = maxHeight;
    toggleHeightAnimation(eleId, 'fold')
    foldElement.remove();
    handleExpandArrow(eleId);
  });
}

function toggleHeightAnimation(eleId, type) {
  let {element, maxHeight, originHeight, lineHeight, ifAnimation} = DomElementsMap[eleId]

  if(!ifAnimation) {
    element.style.maxHeight = type==='expand' ? 'none' : maxHeight;

    return;
  }
  maxHeight = parseFloat(maxHeight);
  originHeight = parseFloat(originHeight);
  lineHeight = parseFloat(lineHeight);

  const step = (originHeight - maxHeight) / 20

  !DomElementsMap[eleId].cHeight && (DomElementsMap[eleId].cHeight = type==='expand' ? maxHeight : originHeight)

  if(type==='expand') {
    DomElementsMap[eleId].cHeight = DomElementsMap[eleId].cHeight + step;
    element.style.maxHeight = DomElementsMap[eleId].cHeight + 'px';
    if(DomElementsMap[eleId].cHeight<originHeight + lineHeight*2) {
      requestAnimationFrame(()=>{
        toggleHeightAnimation(eleId, type);
      });
    } else {
      DomElementsMap[eleId].cHeight = null
    }
  } else {
    DomElementsMap[eleId].cHeight = DomElementsMap[eleId].cHeight - step;
    element.style.maxHeight = DomElementsMap[eleId].cHeight + 'px';
    if(DomElementsMap[eleId].cHeight<=maxHeight) {
      element.style.maxHeight = maxHeight + 'px';
      DomElementsMap[eleId].cHeight = null;
    } else {
      requestAnimationFrame(()=>{
        toggleHeightAnimation(eleId, type);
      });
      
    }
  }
}