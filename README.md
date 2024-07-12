[*Example of usage*](https://tinyurl.com/2mknex43):
```css
.text-overflow {
  line-height: 25px;
}
```
```html
<div id="text_overflow" class="text-overflow">
    用于确定如何提示用户存在隐藏的溢出内容。其形式可以是显示一个省略号、显示一个自定义字符串或显示一个自定义组件。用于确定如何提示用户存在隐藏的溢出内容。其形式可以是显示一个省略号、显示一个自定义字符串或显示一个自定义组件。用于确定如何提示用户存在隐藏的溢出内容。其形式可以是显示一个省略号、显示一个自定义字符串或显示一个自定义组件。用于确定如何提示用户存在隐藏的溢出内容。其形式可以是显示一个省略号、显示一个自定义字符串或显示一个自定义组件。
</div>
```
```js
import multilineTextOverflow from './index.js'
multilineTextOverflow({
  eleId: 'text_overflow',
  foldLines: 2,
  handleType: 'words'
})
```

[*Config Options*](https://tinyurl.com/2mknex43):
```js
{
  eleId: 'text_overflow', // 需要处理多行溢出容易的id
  foldLines: 2, // 溢出时显示的行数
  handleType: 'arrow', // 溢出部分显示的标识，可选值：ellipsis、arrow、words。其中ellipsis表示显示省略号，不可展开；arrow表示显示箭头图标，可展开收起；words表示显示文字，可展开收起
  ifAnimation: false, // 展开收起是否有动画
  color: 'blue', // 展开收起的文字或箭头颜色，默认为蓝色
  backgroundColor: 'white' // 展开收起的文字背景颜色，默认为白色
}
```
