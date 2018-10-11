;(function init (window, document) {
  'use strict'
  // Floating Label events
  // ---------------------------------------------------------------------------

  forEachElement('.floating-label + .form-control', function addFloatingLabel (
    el,
    i
  ) {
    var label = previousElementSibling(el)
    var _id = el.id || el.name || Math.random().toString(36).substring(7)

    if (!el.id) el.id = _id
    if (!label.htmlFor) label.htmlFor = _id
    if (!label.innerHTML.trim()) label.innerHTML = el.placeholder || _id

    if (el.value === '') {
      addClass(label, 'rest')
    } else {
      removeClass(label, 'rest')
    }
    addEventListener(el, 'keydown', floatingLabelHandler)
    addEventListener(el, 'keyup', floatingLabelHandler)
    addEventListener(el, 'change', floatingLabelHandler)
  })

  function floatingLabelHandler (e) {
    var target = e.target
    var label = previousElementSibling(target)

    if (target.value === '') {
      addClass(label, 'rest')
    } else {
      removeClass(label, 'rest')
    }
  }

  // Copy to Clipboard events for color swatches
  // ---------------------------------------------------------------------------

  if (isClipboardSupported()) {
    forEachElement('.color-swatch', function addClipboardEvent (el) {
      var colorCode = window
        .getComputedStyle(el.querySelector('.color-name'), '::before')
        .getPropertyValue('content')
        .replace(/"/g, '')

      el.setAttribute('data-tooltip', 'Copy to clipboard')
      addClass(el, 'actionable')

      addEventListener(el, 'click', function copy () {
        copyToClipboard(colorCode)
        el.setAttribute('data-tooltip', 'Copied!')
        setTimeout(function clearTooltip () {
          el.setAttribute('data-tooltip', 'Copy to clipboard')
        }, 2 * 1000)
      })
    })
  }

  // Generate table of contents
  // ---------------------------------------------------------------------------

  generateDomToc({
    contentRootSelector: 'body',
    headingsSelector: 'h2, h3',
    targetSelector: '[toc-placeholder]'
  })

  function generateDomToc ({
    contentRootSelector = 'body',
    headingsSelector = 'h1, h2, h3, h4, h5, h6',
    targetSelector = '[toc-placeholder]',
    comparator = (current, next) => next.tagName > current.tagName
  }) {
    const headings = document
      .querySelector(contentRootSelector)
      .querySelectorAll(headingsSelector)
    const target = document.querySelector(targetSelector)
    const tree = createTree(comparator, headings)
    target.appendChild(createTocList(tree))
  }

  function createTree (
    fn = (current, next) => next > current,
    [current, ...rest]
  ) {
    const children = takeWhile(fn.bind(null, current), rest)
    const result = children.length
      ? [current, createTree(fn, children)]
      : [current]

    return rest.length - children.length
      ? [result, ...createTree(fn, rest.slice(children.length))]
      : [result]
  }

  function createTocList (tree, listType = 'ul') {
    const list = document.createElement(listType)

    list.classList.add('list-unstyled')

    return tree.reduce((acc, [el, children]) => {
      const li = document.createElement('li')
      const a = document.createElement('a')

      if (!el.id) {
        el.id = el.textContent.toLowerCase().replace(/\s+/g, '_')
      }

      a.href = '#' + el.id
      a.textContent = el.textContent

      li.appendChild(a)

      if (children) li.appendChild(createTocList(children, listType))

      acc.appendChild(li)

      return acc
    }, list)
  }

  // Utility functions
  // ---------------------------------------------------------------------------

  function takeWhile (f, arr, i = 0) {
    return i < arr.length && f(arr[i], i, arr)
      ? takeWhile(f, arr, ++i)
      : arr.slice(0, i)
  }

  function forEachElement (selector, fn) {
    var elements = document.querySelectorAll(selector)

    for (var i = 0; i < elements.length; i++) {
      fn(elements[i], i)
    }
  }

  // prevSibling can include text nodes
  function previousElementSibling (el) {
    if (el.previousElementSibling) return el.previousElementSibling

    do {
      el = el.previousSibling
    } while (el && el.nodeType !== 1)

    return el
  }

  function addEventListener (el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler)
    } else {
      el.attachEvent('on' + eventName, function (e) {
        handler(e)
      })
    }
  }

  function addClass (el, className) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ' ' + className
    }
  }

  function removeClass (el, className) {
    if (el.classList) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      )
    }
  }

  function copyToClipboard (text) {
    // Based on angular-clipboard code
    // by Ole Bjørn Michelsen:
    // https://github.com/omichelsen/angular-clipboard

    var node = createNode(text)
    document.body.appendChild(node)
    copyNode(node)
    document.body.removeChild(node)

    function createNode (text) {
      var node = document.createElement('textarea')
      node.style.position = 'absolute'
      node.textContent = text
      node.style.left = '-10000px'
      node.style.top =
        (window.pageYOffset || document.documentElement.scrollTop) + 'px'
      return node
    }

    function copyNode (node) {
      try {
        // Set inline style to override css styles
        document.body.style.webkitUserSelect = 'initial'

        var selection = document.getSelection()
        selection.removeAllRanges()
        node.select()

        if (!document.execCommand('copy')) {
          throw new Error('failure copy')
        }
        selection.removeAllRanges()
      } finally {
        // Reset inline style
        document.body.style.webkitUserSelect = ''
      }
    }
  }

  function isClipboardSupported () {
    // Based on angular-clipboard code
    // by Ole Bjørn Michelsen:
    // https://github.com/omichelsen/angular-clipboard
    return (
      'queryCommandSupported' in document &&
      document.queryCommandSupported('copy')
    )
  }
})(window, document)
