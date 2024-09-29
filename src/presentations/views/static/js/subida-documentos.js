document.addEventListener('DOMContentLoaded', function () {
    // Selecciono todos los inputs de tipo "file"
    const entradas_archivo = document.querySelectorAll('input[type="file"]');
    
    // Itero sobre cada campo de entrada de archivos
    entradas_archivo.forEach(entrada_archivo => {
        entrada_archivo.addEventListener('change', function () {
            const archivos = this.files;
            const lista_archivos_id = 'fileList_' + this.name; // Encuentro el id único de la lista de archivos asociada
            const lista_archivos = document.getElementById(lista_archivos_id);

            lista_archivos.innerHTML = ''; // Limpio los archivos anteriores

            for (let i = 0; i < archivos.length; i++) {
                const archivo = archivos[i];
                const item_archivo = document.createElement('div');
                item_archivo.className = 'uploaded d-flex align-items-center mb-2';
                const icono_tipo_archivo = archivo.type.startsWith('image/') ? 'fa-file-image' : 'fa-file-pdf';
                item_archivo.innerHTML = `
                    <i class="far ${icono_tipo_archivo} me-3"></i>
                    <div class="file">
                        <div class="file__name d-flex justify-content-between align-items-center">
                            <p class="mb-0">${archivo.name}</p>
                            <i class="fas fa-times" data-index="${i}"></i>
                        </div>
                        <div class="progress mt-2">
                            <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width:0%"></div>
                        </div>
                    </div>
                `;
                lista_archivos.appendChild(item_archivo);

                // Simulo el progreso
                simular_progreso(item_archivo.querySelector('.progress-bar'), item_archivo.querySelector('.fa-times'));
            }
        });
    });

    function simular_progreso(barra_progreso, boton_cerrar) {
        let ancho = 0;
        const intervalo = setInterval(() => {
            if (ancho >= 100) {
                clearInterval(intervalo);
            } else {
                ancho += 20; // Aumento el progreso en un 20%
                barra_progreso.style.width = ancho + '%';
            }
        }, 500);

        // Agrego el evento para eliminar el archivo cuando se hace clic en el botón de cerrar
        boton_cerrar.addEventListener('click', function () {
            const item_archivo = this.closest('.uploaded');
            item_archivo.remove();
        });
    }
});
