/*! canvas-text-wrapper
 *  https://github.com/namniak/canvas-text-wrapper
 *  Version:  0.5.1
 *  MIT License (http://www.opensource.org/licenses/mit-license.html)
 */


(function (root) {

  function CanvasTextWrapper(canvas, text, options) {
    'use strict';

    var defaults = {
      font: '18px Arial, sans-serif',
      sizeToFill: false,      // text is resized to fill the container (given font size is ignored)
      lineHeight: 1,          // default line height equivalent of '100%'
      allowNewLine: true,     // breaks text on every new line character '\n'
      lineBreak: 'auto',      // text fills the element's (canvas or parent) width going to a new line on a whole word
      textAlign: 'left',      // each line of text is aligned left
      verticalAlign: 'top',   // text lines block is aligned top
      justifyLines: false,    // lines are not justified
      paddingX: 0,            // 0px left & right text padding relatively to canvas or its container
      paddingY: 0,            // 0px top & bottom text padding relatively to canvas or its container
      fitParent: false,       // text is set to fit canvas width
      strokeText: false       // text is stroked according to context configuration
    };

    var opts = {};

    for (var property in defaults) {
      if (defaults.hasOwnProperty(property)) {
        opts[property] = (options && options[property]) ? options[property] : defaults[property];
      }
    }

    var context = canvas.getContext('2d');
    context.font = opts.font;
    context.textBaseline = 'bottom';

    var EL_WIDTH = (opts.fitParent === false) ? canvas.width : canvas.parentNode.clientWidth;
    var EL_HEIGHT = (opts.fitParent === false) ? canvas.height : canvas.parentNode.clientHeight;
    var MAX_TXT_WIDTH = EL_WIDTH - (opts.paddingX * 2);
    var MAX_TXT_HEIGHT = EL_HEIGHT - (opts.paddingY * 2);

    var fontSize = opts.font.match(/\d+(px|em|%)/g) ? +opts.font.match(/\d+(px|em|%)/g)[0].match(/\d+/g) : 18;
    var textBlockHeight = 0;
    var lines = [];
    var newLineIndexes = [];
    var textPos = {x: 0, y: 0};
    var lineHeight = 0;
    var fontParts;


    setFont(fontSize);
    setLineHeight();
    validate();
    render();


    function setFont(fontSize) {
      if (!fontParts) fontParts = (!opts.sizeToFill) ? opts.font.split(/\b\d+px\b/i) : context.font.split(/\b\d+px\b/i);
      context.font = fontParts[0] + fontSize + 'px' + fontParts[1];
    }

    function setLineHeight() {
      if (!isNaN(opts.lineHeight)) {
        lineHeight = fontSize * opts.lineHeight;
      } else if (opts.lineHeight.toString().indexOf('px') !== -1) {
        lineHeight = parseInt(opts.lineHeight);
      } else if (opts.lineHeight.toString().indexOf('%') !== -1) {
        lineHeight = (parseInt(opts.lineHeight) / 100) * fontSize;
      }
    }

    function render() {
      if (opts.sizeToFill) {
        var wordsCount = text.trim().split(/\s+/).length;
        var newFontSize = 0;

        do {
          adjustFontSize(++newFontSize);
        } while (textBlockHeight < MAX_TXT_HEIGHT && (lines.join(' ').split(/\s+/).length == wordsCount));

        adjustFontSize(--newFontSize);
      } else {
        wrap();
      }

      if (opts.justifyLines && opts.lineBreak === 'auto') {
        justify();
      }

      setVertAlign();
      drawText();
    }

    function adjustFontSize(size) {
      setFont(size);
      lineHeight = size;
      wrap();
    }

    function wrap() {
      if (opts.allowNewLine) {
        var newLines = text.trim().split('\n');
        for (var i = 0, idx = 0; i < newLines.length - 1; i++) {
          idx += newLines[i].trim().split(/\s+/).length;
          newLineIndexes.push(idx)
        }
      }

      var words = text.trim().split(/\s+/);
      checkLength(words);
      breakText(words);

      textBlockHeight = lines.length * lineHeight;
    }

    function checkLength(words) {
      var testString, tokenLen, sliced, leftover;

      words.forEach(function (word, index) {
        testString = '';
        tokenLen = context.measureText(word).width;

        if (tokenLen > MAX_TXT_WIDTH) {
          for (var k = 0; (context.measureText(testString + word[k]).width <= MAX_TXT_WIDTH) && (k < word.length); k++) {
            testString += word[k];
          }

          sliced = word.slice(0, k);
          leftover = word.slice(k);
          words.splice(index, 1, sliced, leftover);
        }
      });
    }

    function breakText(words) {
      for (var i = 0, j = 0; i < words.length; j++) {
        lines[j] = '';

        if (opts.lineBreak === 'auto') {
          while ((context.measureText(lines[j] + words[i]).width <= MAX_TXT_WIDTH) && (i < words.length)) {

            lines[j] += words[i] + ' ';
            i++;

            if (opts.allowNewLine) {
              for (var k = 0; k < newLineIndexes.length; k++) {
                if (newLineIndexes[k] === i) {
                  j++;
                  lines[j] = '';
                  break;
                }
              }
            }
          }
          lines[j] = lines[j].trim();
        } else {
          lines[j] = words[i];
          i++;
        }
      }
    }

    function justify() {
      var maxLen, longestLineIndex, tokenLen;
      for (var i = 0; i < lines.length; i++) {
        tokenLen = context.measureText(lines[i]).width;

        if (!maxLen || tokenLen > maxLen) {
          maxLen = tokenLen;
          longestLineIndex = i;
        }
      }

      // fill lines with extra spaces
      var numWords, spaceLength, numOfSpaces, num, filler;
      var delimiter = '\u200A';
      for (i = 0; i < lines.length; i++) {
        if (i === longestLineIndex) continue;

        numWords = lines[i].trim().split(/\s+/).length;
        if (numWords <= 1) continue;

        lines[i] = lines[i].trim().split(/\s+/).join(delimiter);

        spaceLength = context.measureText(delimiter).width;
        numOfSpaces = (maxLen - context.measureText(lines[i]).width) / spaceLength;
        num = numOfSpaces / (numWords - 1);

        filler = '';
        for (var j = 0; j < num; j++) {
          filler += delimiter;
        }

        lines[i] = lines[i].trim().split(delimiter).join(filler);
      }
    }

    function drawText() {
      for (var i = 0; i < lines.length; i++) {
        setHorizAlign(lines[i]);

        textPos.y = parseInt(textPos.y) + lineHeight;
        context.fillText(lines[i], textPos.x, textPos.y);

        if (opts.strokeText) {
          context.strokeText(lines[i], textPos.x, textPos.y);
        }
      }
    }

    function setHorizAlign(line) {
      if (opts.textAlign == 'center') {
        textPos.x = (EL_WIDTH - context.measureText(line).width) / 2;
      } else if (opts.textAlign == 'right') {
        textPos.x = EL_WIDTH - context.measureText(line).width - opts.paddingX;
      } else {
        textPos.x = opts.paddingX;
      }
    }

    function setVertAlign() {
      if (opts.verticalAlign == 'middle') {
        textPos.y = (EL_HEIGHT - textBlockHeight) / 2;
      } else if (opts.verticalAlign == 'bottom') {
        textPos.y = EL_HEIGHT - textBlockHeight - opts.paddingY;
      } else {
        textPos.y = opts.paddingY;
      }
    }

    function validate() {
      if (!(canvas instanceof HTMLCanvasElement))
        throw new TypeError('The first parameter must be an instance of HTMLCanvasElement.');

      if (typeof text !== 'string')
        throw new TypeError('The second parameter must be a String.');

      if (isNaN(fontSize))
        throw new TypeError('Cannot parse "font".');

      if (isNaN(lineHeight))
        throw new TypeError('Cannot parse "lineHeight".');

      if (opts.textAlign.toLocaleLowerCase() !== 'left' && opts.textAlign.toLocaleLowerCase() !== 'center' && opts.textAlign.toLocaleLowerCase() !== 'right')
        throw new TypeError('Property "textAlign" must be set to either "left", "center", or "right".');

      if (opts.verticalAlign.toLocaleLowerCase() !== 'top' && opts.verticalAlign.toLocaleLowerCase() !== 'middle' && opts.verticalAlign.toLocaleLowerCase() !== 'bottom')
        throw new TypeError('Property "verticalAlign" must be set to either "top", "middle", or "bottom".');

      if (typeof opts.justifyLines !== 'boolean')
        throw new TypeError('Property "justifyLines" must be a Boolean.');

      if (isNaN(opts.paddingX))
        throw new TypeError('Property "paddingX" must be a Number.');

      if (isNaN(opts.paddingY))
        throw new TypeError('Property "paddingY" must be a Number.');

      if (typeof opts.fitParent !== 'boolean')
        throw new TypeError('Property "fitParent" must be a Boolean.');

      if (opts.lineBreak.toLocaleLowerCase() !== 'auto' && opts.lineBreak.toLocaleLowerCase() !== 'word')
        throw new TypeError('Property "lineBreak" must be set to either "auto" or "word".');

      if (typeof opts.sizeToFill !== 'boolean')
        throw new TypeError('Property "sizeToFill" must be a Boolean.');

      if (typeof opts.strokeText !== 'boolean')
        throw new TypeError('Property "strokeText" must be a Boolean.');
    }
  }

  if ('module' in root && 'exports' in module) {
    module.exports = CanvasTextWrapper;
  } else {
    root.CanvasTextWrapper = CanvasTextWrapper;
  }
})(this);