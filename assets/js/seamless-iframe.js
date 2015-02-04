// This script uses jQuery to resize an iframe to its content's height and
// the max of viewport width or content width.
// A selector for a container in the iframe with a given with (not <body>
// nor <html>) is required.

(function($) {
  function getViewportWidth() {
    return $(window).width();
  }

  function getViewportHeight() {
    return $(window).height();
  }

  // Cross-browser way of getting iframe document
  function getIframeDoc(iframe) {
    return iframe.contentDocument || iframe.contentWindow.document;
  }

  function getTargetIframeNode($iframe, targetSelector) {
    var $iframeDocument = $(getIframeDoc($iframe.get(0)));
    return $iframeDocument.find(targetSelector);
  }

  function getIframeContentHeight($iframe, targetSelector) {
    return getTargetIframeNode($iframe, targetSelector).height();
  }

  function getIframeContentWidth($iframe, targetSelector) {
    return getTargetIframeNode($iframe, targetSelector).width();
  }

  function setIframeSize($iframe, width, height) {
    $iframe.prop("width", width);
    $iframe.prop("height", height);
  }

  function resizeIframe($iframe, targetSelector) {
    var viewportWidth = getViewportWidth(),
      height = getIframeContentHeight($iframe, targetSelector);
    setIframeSize(
      $iframe,
      Math.max(viewportWidth, getIframeContentWidth($iframe, targetSelector)),
      height
    );
  }

  function resizeIframeOnContentResize($iframe, targetSelector) {
    getTargetIframeNode($iframe, targetSelector).on("resize", function() {
      resizeIframe($iframe, targetSelector);
    });
  }

  function resizeIframeOnViewportResize($iframe, targetSelector) {
    $(window).resize(function (){
      resizeIframe($iframe, targetSelector);
    });
  }

  $(function() {
    var $iframe = $(".iframe-seamless")
      , targetSelector = "#wrapper";

    // Initial size
    setIframeSize($iframe, getViewportWidth(), getViewportHeight());

    $iframe.load(function() {
      resizeIframe($iframe, targetSelector);
      resizeIframeOnContentResize($iframe, targetSelector);
      resizeIframeOnViewportResize($iframe, targetSelector);
    });
  });
})(jQuery);