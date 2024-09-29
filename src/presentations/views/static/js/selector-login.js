function SeleccionarClienteICI(elemento) {
    // Primero, obtengo el valor del atributo 'opcion' del elemento que se ha hecho clic
    let opcion = elemento.getAttribute("opcion");

    // Luego, obtengo los botones de registro y login por su ID
    let btn_registro = document.getElementById("boton_registro");
    let btn_login = document.getElementById("boton_login");

    // Verifico si la opción es válida ('cliente' o 'ici')
    if (opcion === "cliente" || opcion === "ici") {

        // Si la opción es 'cliente'
        if (opcion === "cliente") {
            // Cambio la URL de los botones de acuerdo a la opción seleccionada
            btn_login.onclick = function () {
                window.location.href = 'http://127.0.0.1:5000/auth/login-cliente';
            };
            btn_registro.onclick = function () {
                window.location.href = 'http://127.0.0.1:5000/auth/registrar-cliente';
            };

            //Cambio texto del botón para registrarse:
            btn_registro.textContent = "Hazte cliente"

        } else { // Si la opción es 'ici'
            // Cambio la URL de los botones de acuerdo a la opción seleccionada
            btn_login.onclick = function () {
                window.location.href = 'http://127.0.0.1:5000/auth/login-ici';
            };
            btn_registro.onclick = function () {
                window.location.href = 'http://127.0.0.1:5000/auth/registrar-ici';
            };
            //Cambio texto del botón para registrarse:
            btn_registro.textContent = "Hazte intermediario"
        }

        // A continuación, cambio la clase del botón seleccionado
        // Primero, selecciono todos los elementos que tienen la clase 'linea-seleccionada'
        let itemsNav = document.querySelectorAll('.linea-seleccionada');
        itemsNav.forEach(function (item) {
            // Quito la clase 'linea-seleccionada' de los elementos previamente seleccionados
            item.classList.remove('linea-seleccionada');
            // Añado la clase 'linea-nav' para restaurar el estilo original de los elementos
            item.classList.add('linea-nav');
        });

        // Ahora, añado la clase 'linea-seleccionada' al botón que se ha seleccionado
        // Obtengo el elemento hermano siguiente al elemento clicado (la línea debajo del botón)
        let lineaSeleccionada = elemento.parentNode.nextElementSibling;
        // Añado la clase 'linea-seleccionada' para marcar el botón como seleccionado
        lineaSeleccionada.classList.add('linea-seleccionada');
        // Elimino la clase de animación 'linea-nav' del elemento seleccionado
        lineaSeleccionada.classList.remove('linea-nav');

    } else {
        // Si la opción no es válida, lanzo un error
        throw new TypeError("Esta opción no es válida, solo puedes seleccionar 'cliente' o 'ici' en el header...");
    }
}
