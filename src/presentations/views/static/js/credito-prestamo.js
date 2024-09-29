document.addEventListener("DOMContentLoaded", function () {
  const propertyValueInput = document.getElementById("propertyValue");
  const propertyValueInputMonth = document.getElementById("propertyValueMonth");
  const slider = document.getElementById("slider");
  const sliderMonth = document.getElementById("slider-month");

  //   function updateValues() {
  //     const propertyValue = parseFloat(propertyValueInput.value);
  //   }

  function updateRangeColor() {
    const value =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right,  var(--bs-dark) ${value}%, #ddd ${value}%)`;
    slider.style.borderRadius = "15px";
  }

  function updateRangeColorMonth() {
    const valueMonth =
      ((sliderMonth.value - sliderMonth.min) /
        (sliderMonth.max - sliderMonth.min)) *
      100;

    sliderMonth.style.background = `linear-gradient(to right,  var(--bs-dark) ${valueMonth}%, #ddd ${valueMonth}%)`;
  }

  propertyValueInput.addEventListener("input", function () {
    slider.value = propertyValueInput.value;
    updateRangeColor();
  });

  propertyValueInputMonth.addEventListener("input", function () {
    sliderMonth.value = propertyValueInputMonth.value;

    updateRangeColorMonth();
  });

  slider.addEventListener("input", function () {
    propertyValueInput.value = slider.value;

    updateRangeColor();
  });

  sliderMonth.addEventListener("input", function () {
    propertyValueInputMonth.value = sliderMonth.value;

    updateRangeColorMonth();
  });

  updateRangeColor();
  updateRangeColorMonth();
});
