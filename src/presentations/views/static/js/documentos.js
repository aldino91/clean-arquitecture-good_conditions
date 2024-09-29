function VerDocumento(documento_id) {
    // Construyo la URL para obtener el documento usando su ID
    const url = `/documento/ver-documento/${documento_id}`;
    
    // Establezco la fuente (src) del iframe a esta URL
    document.getElementById('iframe_documento').src = url;
    // Cambio link del botón abrir en nueva pestaña
    document.getElementById("nueva_pestaña").onclick = function() {
        window.open(url, '_blank');
    };
}

/**
 * Esta función actualiza el atributo `onclick` del botón de confirmación en el modal.
 * @param {number} doc_id - El ID del documento que se va a eliminar.
 */
function CambiarHrefConfirmación(doc_id) {
    // Selecciono el botón de confirmación en el modal
    const eliminar_btn = document.querySelector('#btn_confirmar_eliminar');

    const url_elim = `${window.location.origin}/documento/eliminar/${doc_id}`;

    // Actualizo el enlace del botón de confirmación con el ID del documento
    eliminar_btn.setAttribute('onclick', `location.href = '${url_elim}'`);
}

document.getElementById('PopupDocumento').addEventListener('hidden.bs.modal', function () {
    document.getElementById('iframe_documento').src = "";
});