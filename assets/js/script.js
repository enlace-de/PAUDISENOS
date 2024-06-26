
//

const compartirIcon = document.getElementById('compartirIcon');

compartirIcon.addEventListener('click', function (event) {
    event.preventDefault();
    compartirPorSMS();
});

function compartirPorSMS() {
    const url = window.location.href;
    const mensaje = 'Echa un vistazo a este enlace: ' + url;

    if ('share' in navigator) {
        // Si el navegador admite la API de Web Share, úsala
        navigator.share({
            title: document.title,
            text: mensaje,
            url: url,
        })
        .then(() => console.log('Enlace compartido con éxito'))
        .catch(error => console.error('Error al compartir: ', error));
    } else {
        // Si el navegador no admite la API de Web Share, abre un enlace de SMS
        window.open(`sms:?body=${encodeURIComponent(mensaje)}`, '_blank');
    }
}


//mmm
function copiarAlPortapapeles() {
    // Crea un elemento de entrada de texto temporal
    const input = document.createElement('input');
    input.setAttribute('value', 'https://priscillabuhrle.github.io/PAU_Disenos/');
    
    // Agrega el elemento de entrada de texto al documento
    document.body.appendChild(input);
    
    // Selecciona el contenido del elemento de entrada de texto
    input.select();
    
    // Copia el contenido seleccionado al portapapeles
    document.execCommand('copy');
    
    // Elimina el elemento de entrada de texto temporal
    document.body.removeChild(input);

    // Cambia el texto del span para indicar que se ha copiado
    const favoritoLabel = document.getElementById('favoritoLabel');
    favoritoLabel.textContent = 'Link Copiado';
    
    // Cambia el icono para proporcionar retroalimentación visual
    favoritoIcon.classList.remove('fa-regular', 'fa-copy');
    favoritoIcon.classList.add('fa-solid', 'fa-check');
    
    // Restaura el estado original después de un tiempo
    setTimeout(function () {
        favoritoLabel.textContent = 'Copiar Link';
        favoritoIcon.classList.remove('fa-solid', 'fa-check');
        favoritoIcon.classList.add('fa-regular', 'fa-copy');
    }, 3000); // Cambios de vuelta después de 2 segundos
}

favoritoIcon.addEventListener('click', copiarAlPortapapeles);

// animacion logo
// Obtiene la referencia a la imagen por su ID

const logoImage = document.getElementById('logoImage');

// Función para iniciar la animación
function iniciarAnimacion() {
    logoImage.classList.add('animacion');
}

// Agrega un controlador de eventos al cargar la página
window.addEventListener('load', iniciarAnimacion);

// Agrega un controlador de eventos al hacer clic en la imagen
logoImage.addEventListener('click', () => {
    // Reinicia la animación al hacer clic
    logoImage.classList.remove('animacion');
    void logoImage.offsetWidth; // Esto fuerza un reinicio de la animación
    logoImage.classList.add('animacion');
});

// funcion agregar a pagina de inicio

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});

function addToHomeScreen() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  } else {
    alert("Para agregar a la pantalla de inicio, ve al menú de la barra inferior y selecciona COMPARTIR (cuadrado con una flecha hacia arriba), después AGREGAR A LA PANTALLA DE INICIO, finalmente AGREGAR ubicado en la esquina superior derecha.");
  }
}



