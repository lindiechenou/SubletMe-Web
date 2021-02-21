// alert("Home");
(function () {
  var parent = document.querySelector(".price-slider"); //acts as parent and holds a node list for everything in the HTML <div>
  if (!parent) return;

  var //variables associated with the parent variable that return node list of elements with matching selector
    ranges = parent.querySelectorAll("input[type=range]"),
    numbers = parent.querySelectorAll("input[type=number]");

  //function that associates the range sliders with the input boxes
  ranges.forEach(function (slide) {
    slide.oninput = function () {
      var slide1 = parseFloat(ranges[0].value),
        slide2 = parseFloat(ranges[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
      }

      numbers[0].value = slide1;
      numbers[1].value = slide2;
    };
  });

  //function that associates the input boxes with the range sliders
  numbers.forEach(function (input) {
    input.oninput = function () {
      var number1 = parseFloat(numbers[0].value),
        number2 = parseFloat(numbers[1].value);

      ranges[0].value = number1;
      ranges[1].value = number2;
    };
  });
})();
