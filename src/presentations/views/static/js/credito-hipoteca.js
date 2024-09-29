document.addEventListener("DOMContentLoaded", function () {
  const propertyValueInput = document.getElementById("propertyValue");
  const slider = document.getElementById("slider");
  const downPaymentElement = document.getElementById("downPayment");
  const savingsElement = document.getElementById("savings");
  const taxesElement = document.getElementById("taxes");
  const mortgageAmountElement = document.getElementById("mortgageAmount");

  function updateValues() {
    const propertyValue = parseFloat(propertyValueInput.value);
    const downPayment = propertyValue * 0.12;
    const savings = propertyValue * 0.32;
    const taxes = downPayment;
    const mortgageAmount = propertyValue - downPayment;

    downPaymentElement.textContent = downPayment.toFixed(0);
    savingsElement.textContent = savings.toFixed(0);
    taxesElement.textContent = taxes.toFixed(0);
    mortgageAmountElement.textContent = mortgageAmount.toFixed(0);
  }

  function updateRangeColor() {
    const value =
      ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background = `linear-gradient(to right,  var(--bs-dark) ${value}%, #ddd ${value}%)`;
    slider.style.borderRadius = "15px";
  }

  propertyValueInput.addEventListener("input", function () {
    slider.value = propertyValueInput.value;
    updateValues();
    updateRangeColor();
  });

  slider.addEventListener("input", function () {
    propertyValueInput.value = slider.value;
    updateValues();
    updateRangeColor();
  });

  updateValues(); // Cálculo inicial
  updateRangeColor(); // Color inicial del rango
});
