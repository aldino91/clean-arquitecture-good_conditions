function MasInfoCrédito(id_cred) {
    // Primero, creo una nueva instancia de XMLHttpRequest para realizar la solicitud AJAX
    var xhr = new XMLHttpRequest();
    
    // Configuro la solicitud GET con la URL del crédito
    xhr.open('GET', '/api/credito/' + id_cred, true);
    
    // Defino la función que se ejecutará cuando cambie el estado de la solicitud
    xhr.onreadystatechange = function() {
        // Verifico si la solicitud ha terminado (estado DONE)
        if (xhr.readyState === XMLHttpRequest.DONE) {
            // Reviso el código de estado de la respuesta
            if (xhr.status === 200) {
                // Si el código de estado es 200, la respuesta es exitosa, así que convierto la respuesta en JSON
                var data = JSON.parse(xhr.responseText);

                // Ahora, reviso si los datos contienen un campo de error
                if (data.error) {
                    // Si hay un error en los datos, redirijo al usuario a la página de login
                    window.location.href = '/auth/login-cliente';
                } else {
                    // Si los datos son correctos, actualizo el contenido del modal con los detalles del crédito
                    document.getElementById('itemName').textContent = `Crédito ID: ${data.id}`;
                    document.getElementById('itemDescription').innerHTML = `
                        <div class="item-description">
                            <p><strong>Estado:</strong> ${data.estado_crédito}</p>
                            <p><strong>Servicio:</strong> ${data.opción_financiera}</p>
                            <p><strong>Valor del Crédito:</strong> ${data.valor_crédito} Eur</p>
                            <p><strong>Dirección:</strong> ${data.dirección}</p>
                            <p><strong>Estado Civil:</strong> ${data.estado_civil}</p>
                            <p><strong>Gastos:</strong> ${data.gastos} Eur</p>
                            <p><strong>Ingresos:</strong> ${data.ingresos} Eur</p>
                            <p><strong>Número de Hijos:</strong> ${data.numero_hijos}</p>
                            <p><strong>País de Residencia:</strong> ${data.país_residencia}</p>
                            <p><strong>Permiso de Residencia:</strong> ${data.permiso_residencia}</p>
                            <p><strong>Provincia:</strong> ${data.provincia}</p>
                            <p><strong>Situación Laboral:</strong> ${data.situación_laboral}</p>
                            <p><strong>Años para Devolver:</strong> ${data.años_devolver}</p>
                        </div>
                        <div class="item-buttons">
                            <button id="ver_docs" class="btn btn-secondary" onclick="window.location.href='${window.location.origin}/documento/menu-documentos/${data.id}'">Ver Documentos</button>
                            <button id="nuevo_mensaje" class="btn btn-secondary" onclick="window.location.href='${window.location.origin}/credito/menu-mensajes/${data.id}'">Nuevo mensaje</button>
                            <button id="ver_prop" class="btn btn-secondary" data-bs-toggle="modal" onclick="VerPropuestasCliente(${data.id})" data-bs-target="#PopupPropuestas">Ver propuestas</button>
                            <button id="subir_docs" class="btn btn-secondary" onclick="window.location.href='${window.location.origin}/documento/subida-cliente/${data.id}'">Subir documentos</button>
                </div>`;
                }
            } else if (xhr.status === 401 || xhr.status === 403) {
                // Si el código de estado es 401 (No Autorizado) o 403 (Prohibido), redirijo al usuario a la página de login
                window.location.href = '/auth/login-cliente';
            } else {
                // Para otros códigos de estado, registro el error y redirijo al usuario a la página de login
                console.error('Error HTTP: ' + xhr.status);
                window.location.href = '/auth/login-cliente';
            }
        }
    };

    // Defino la función que se ejecutará si ocurre un error durante la solicitud
    xhr.onerror = function() {
        // Redirijo al usuario a la página de login en caso de error de la solicitud
        window.location.href = '/auth/login-cliente';
    };

    // Finalmente, envío la solicitud
    xhr.send();
}

/**
 * Esta función actualiza el atributo `onclick` del botón de confirmación en el modal.
 * @param {number} credito_id - El ID del crédito que se va a eliminar.
 */
function CambiarHrefConfirmación(credito_id) {
    // Selecciono el botón de confirmación en el modal
    const eliminar_btn = document.querySelector('#btn_confirmar_eliminar');

    const url_elim = `${window.location.origin}/credito/eliminar/${credito_id}`;

    // Actualizo el enlace del botón de confirmación con el ID del crédito
    eliminar_btn.setAttribute('onclick', `location.href = '${url_elim}'`);
}

function VerPropuestasCliente(credito_id) {
    // Defino la URL de la API para obtener las propuestas
    const url = `${window.location.origin}/api/ver-propuestas-cliente/${credito_id}`;
    
    // Creo un nuevo objeto XMLHttpRequest
    const xhr = new XMLHttpRequest();
    
    // Configuro la solicitud
    xhr.open('GET', url, true);

    // Defino la función que se ejecutará cuando la solicitud cambie de estado
    xhr.onreadystatechange = function() {
        // Verifico que la solicitud esté completa y se haya recibido correctamente
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Parseo la respuesta JSON
            const data = JSON.parse(xhr.responseText);

            // Selecciono el contenedor donde voy a mostrar las propuestas
            const contenedor_row = document.querySelector('#contenedor_propuestas');

            // Limpio el contenido anterior
            contenedor_row.innerHTML = '';

            // Verifico si hay propuestas
            if (data.length > 0) {
                // Recorro cada propuesta y creo el HTML correspondiente
                data.forEach((propuesta, index) => {
                    // Creo el contenedor de la propuesta
                    const contenedor = document.createElement('div');
                    contenedor.classList.add('col-md-12', 'mb-4');
                    
                    contenedor.innerHTML = `
                        <div class="contenedor-producto">
                            <div class="encabezado-producto">
                                <div class="logo-producto">
                                    <img src="https://creditosyprestamosmallorca.es/wp-content/uploads/2024/01/logo1.png" alt="Logo">
                                </div>
                                <div>
                                    <div class="nombre-producto">Créditos y Prestamos Mallorca | Propuesta numero: ${propuesta.id}</div>
                                    <div class="regalo-producto">
                                        <img src="https://banqmi.com/wp-content/uploads/icon-gift-product.svg" alt="Icono regalo">
                                        <span>¡Precio personalizado para cada cliente!</span>
                                    </div>
                                </div>
                            </div>
                            <div class="contenido-producto">
                                <div class="columna-producto">
                                    <p>Dinero a Pagar</p>
                                    <p><span>${propuesta.dinero_pagar} €</span></p>
                                </div>
                                <div class="columna-producto">
                                    <p>Dinero a Recibir</p>
                                    <p><span>${propuesta.dinero_recibir} €</span></p>
                                </div>
                                <div class="columna-producto">
                                    <p>TIN</p>
                                    <p><span>${propuesta.tin} %</span></p>
                                </div>
                                <div class="columna-producto">
                                    <p>TAE</p>
                                    <p><span>${propuesta.tae} %</span></p>
                                </div>
                                <div class="columna-producto-boton">
                                    <a class="boton-solicitar-producto" href="${window.location.origin}/propuesta/aceptar-propuesta/${propuesta.id}" target="_blank" rel="noreferrer noopener">Aceptar esta propuesta</a>
                                </div>
                            </div>
                            <button class="btn-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_content${index}" aria-expanded="true" aria-controls="collapse_content${index}"></button>
                            <div class="contenido-colapsable collapse show" id="collapse_content${index}">
                                <ul>
                                    <li>Email: ${propuesta.email}</li>
                                    <li>Teléfono de contacto intermediario de credito: ${propuesta.teléfono}</li>
                                    <li>Puedes solicitarla 100% online</li>
                                    <li>Comentarios: ${propuesta.observaciones}</li>
                                </ul>
                            </div>
                        </div>
                    `;

                    // Añado el contenedor de la propuesta al contenedor principal
                    contenedor_row.appendChild(contenedor);
                });
            } else {
                // Si no hay propuestas, muestro un mensaje
                contenedor_row.innerHTML = '<p>No hay propuestas disponibles.</p>';
            }
        } else if (xhr.readyState === 4) {
            // Si ocurre un error, muestro un mensaje
            document.querySelector('.container .row').innerHTML = '<p>Error al cargar las propuestas.</p>';
        }
    };

    // Envío la solicitud
    xhr.send();
}