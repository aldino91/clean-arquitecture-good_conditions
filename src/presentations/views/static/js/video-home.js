/**
 * Maneja la reproducción y pausa del video.
 * Actualiza el icono del botón de play/pause según el estado del video.
 */
function handlePlayPause() {
    var video = document.getElementById('customVideo');
    var play_pause_icon = document.getElementById('playPauseIcon');

    if (video.paused) {
        video.play();
        play_pause_icon.classList.remove('fa-play');
        play_pause_icon.classList.add('fa-pause');
    } else {
        video.pause();
        play_pause_icon.classList.remove('fa-pause');
        play_pause_icon.classList.add('fa-play');
    }
}

/**
 * Actualiza la barra de progreso según el tiempo actual del video.
 * Calcula el porcentaje del tiempo transcurrido y ajusta la barra de progreso.
 */
function updateProgressBar() {
    var video = document.getElementById('customVideo');
    var progress_bar = document.getElementById('progressBar');
    var progress = (video.currentTime / video.duration) * 100;

    progress_bar.value = progress;
}

/**
 * Ajusta el tiempo de reproducción del video basado en la posición de la barra de progreso.
 * Cambia el tiempo actual del video según el valor de la barra de progreso.
 */
function setVideoTimeFromProgressBar() {
    var video = document.getElementById('customVideo');
    var progress_bar = document.getElementById('progressBar');
    var progress = progress_bar.value / 100;

    video.currentTime = progress * video.duration;
}

/**
 * Inicializa el estado del botón de play/pause según el estado del video.
 * Ajusta el icono del botón para reflejar si el video está en reproducción o pausa.
 */
function initializePlayPauseIcon() {
    var video = document.getElementById('customVideo');
    var play_pause_icon = document.getElementById('playPauseIcon');

    if (video.paused) {
        play_pause_icon.classList.remove('fa-pause');
        play_pause_icon.classList.add('fa-play');
    } else {
        play_pause_icon.classList.remove('fa-play');
        play_pause_icon.classList.add('fa-pause');
    }
}

// Espero a que el DOM esté completamente cargado antes de inicializar los controles
document.addEventListener('DOMContentLoaded', function () {
    initializePlayPauseIcon();

    var play_pause_button = document.getElementById('playPause');
    var progress_bar = document.getElementById('progressBar');
    var video = document.getElementById('customVideo');

    play_pause_button.addEventListener('click', handlePlayPause);
    video.addEventListener('timeupdate', updateProgressBar);
    progress_bar.addEventListener('input', setVideoTimeFromProgressBar);
    video.addEventListener('play', initializePlayPauseIcon);
    video.addEventListener('pause', initializePlayPauseIcon);
});
