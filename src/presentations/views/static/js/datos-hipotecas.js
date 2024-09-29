document.addEventListener("DOMContentLoaded", function () {

  function toggleRegimenField() {
    var estadoCivil = document.querySelector('input[name="estado_civil"]:checked');
    var regimenContainer = document.getElementById('regimen-container');

    if (estadoCivil && estadoCivil.value === 'CASADO') {
        regimenContainer.classList.add('show');
    } else {
        regimenContainer.classList.remove('show');
    }
}

// Añadir un evento de cambio a los radio buttons de estado civil
document.querySelectorAll('input[name="estado_civil"]').forEach(function(element) {
    element.addEventListener('change', toggleRegimenField);
});

// Llamar a la función al cargar la página para asegurar que el estado inicial es correcto
toggleRegimenField();

})
