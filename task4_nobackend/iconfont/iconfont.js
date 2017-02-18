;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-close" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M812.689774 210.214617c-174.598649-174.589443-458.615944-174.589443-633.212547 0-174.589443 174.59558-174.589443 458.615944 0 633.210501 174.59558 174.590466 458.613898 174.590466 633.212547 0C987.277171 668.830561 987.277171 384.810198 812.689774 210.214617L812.689774 210.214617zM748.563437 686.407353c1.824991 1.758498 2.736464 4.102138 2.736464 6.511249 0 2.408088-0.911473 4.688304-2.736464 6.510226L668.561518 779.430745c-1.890462 1.892507-4.164539 2.672016-6.511249 2.800911-2.407065-0.128895-4.686258-0.909427-6.575696-2.800911l-159.357315-159.615105L336.625934 779.237403c-1.822945 1.758498-4.166585 2.672016-6.511249 2.672016-2.408088 0-4.688304-0.914541-6.575696-2.672016l-79.937471-80.070458c-1.88637-1.758498-2.736464-4.166585-2.736464-6.506134 0-2.408088 0.850094-4.688304 2.670993-6.511249l159.55168-159.4279L243.730414 367.297854c-1.821922-1.821922-2.665878-4.101115-2.665878-6.511249 0-2.344663 0.843956-4.688304 2.731349-6.575696l80.007033-79.937471c1.822945-1.821922 4.102138-2.735441 6.575696-2.735441 2.409111 0 4.684212 0.914541 6.441686 2.670993l159.4279 159.55168 7.225287-7.22631 152.2599-152.195453c1.895576-1.823968 4.105207-2.736464 6.513295-2.736464 2.407065 0 4.689327 0.912496 6.511249 2.736464l80.003964 80.070458c1.753383 1.753383 2.66997 4.097023 2.66997 6.570581 0 2.344663-0.844979 4.623856-2.66997 6.512272L589.205099 526.854649 748.563437 686.407353 748.563437 686.407353zM748.563437 686.407353"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-todo_list" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M379.733333 386.133333l-157.866666 155.733334-89.6-87.466667L85.333333 501.333333l136.533334 136.533334 204.8-204.8zM379.733333 108.8l-157.866666 155.733333-89.6-87.466666L85.333333 224l136.533334 136.533333L426.666667 155.733333zM379.733333 663.466667l-157.866666 155.733333-89.6-87.466667L85.333333 778.666667l136.533334 136.533333 204.8-204.8z" fill="#3F51B5" ></path>' +
    '' +
    '<path d="M512 469.333333h426.666667v85.333334H512zM512 192h426.666667v85.333333H512zM512 746.666667h426.666667v85.333333H512z" fill="#90CAF9" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)