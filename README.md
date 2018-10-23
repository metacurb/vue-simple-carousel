# 🎠 Vue Simple Carousel

### This library is still under development

> Vue Simple Carousel is aimed to get you up and on your feet quickly. Few settings, and fully responsive.

## Getting started

### Using npm
```
npm i vue-simple-carousel
```

Setup notes here

## How to use

_Vue Simple Carousel_ uses a simple structure. 

## Configuration

### Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| autoplay | `Boolean` | false | Determines whether the carousel will cycle on it's own |
| autoplayCycleFrequency | `Number` | `4000` | How long before the autoplaying carousel will cycle again (milliseconds) |
| autoplayDirection | `String` | `'right'` | The direction the carousel autoplays in. Accepts `'left'` or `'right'` |
| autoplayPauseOnHover | `Boolean` | `true` | Pause autoplay when a user hovers over the carousel |
| infiniteCycle | `Boolean` | `false` | Cycle the carousel infinitely |
| minDrag | `Number` | `100` | The minimum distance to drag before slide transition will occur (pixels) |
| navigationColor | `String` | `'#000'` | The colour of the navigation arrows. Can be any CSS-supported colour format |
| navigationEnabled | `Boolean` | `true` | Show navigation arrows either side of the carousel |
| navigationPadding | `Number` | `16` | The padding around each navigation arrow (pixels) |
| navigationSize | `Number` | `30` | The size of the navigation arrows (pixels) |
| paginationColor | `String` | `'#aaa'` | The pagination dot colour |
| paginationColorActive | `String` | `'#000'` | The pagination dot colour when active |
| paginationEnabled | `Boolean` | `true` | Show pagination below the carousel |
| paginationMargin | `Number` | `6` | The margin between each pagination dot (pixels) |
| pointerEventsEnabled | `Boolean` | `true` | Allow the user to swipe/drag to change slide |
| slideEasing | `String` | `'ease'` | The transition type between slides |
| slideSpeed | `Number` | `2000` | The speed of transition between slides (milliseconds) |
### Events

There is a single `onNavigation` event, which will return an `Object` containing some simple information. An example can be found below.
```js
{
  currentSlide: 2, // Number
  previousSlide: 1, // Number
  isLastSlide: false, // Boolean
  navigationType: 'swipe' // String - will return either 'swipe', 'pagination', 'navigation' or 'autoplay'
}
```

## Development

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```
