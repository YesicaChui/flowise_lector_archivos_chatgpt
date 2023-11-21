async function onIniciarChatDocument() {
  const inputPregunta = document.getElementById('inputPregunta')
  const inputFile = document.getElementById('inputFile')
  const divContainer = document.querySelector('.container')
  if (inputPregunta.value == '') {
    alert('Escriba el nombre de un platillo')
    return
  }
  if (inputFile.files.length === 0) {
    alert('Por favor, selecciona un archivo.');
    return;  
  }
  mostrarCarga(true)
  // configuramos el formData
  let formData = new FormData();
  formData.append("files", inputFile.files[0])
  formData.append("returnSourceDocuments", true)
  formData.append("systemMessagePrompt", "example")
  formData.append("chainOption", "example")
  formData.append("question", inputPregunta.value)
  //usamos la query según ejemplo de Flowise
  const respuesta = await query(formData)

  divContainer.innerHTML = respuesta.text
  mostrarCarga(false)
}

async function query(formData) {
  const response = await fetch(
      "http://localhost:3000/api/v1/prediction/dff9d236-c30b-4ef5-9b6b-a6da9b321560",
      {
          method: "POST",
          body: formData
      }
  );
  console.log(response)
  const result = await response.json();
  return result;
}



function updateFileName() {
  const inputFile = document.getElementById('inputFile');
  const fileLabel = document.getElementById('file-selected');
  
  // Verificar si se seleccionó algún archivo
  if (inputFile.files.length > 0) {
    // Mostrar el nombre del archivo seleccionado
    fileLabel.innerHTML = `Archivo seleccionado: ${inputFile.files[0].name}`;
  } else {
    // Restablecer el texto si no hay archivo seleccionado
    fileLabel.innerHTML = 'Subir Archivo';
  }
}

function mostrarCarga(esCargando) {
  const divContainer = document.querySelector('.container')
  const btnArmar = document.getElementById('btnArmar')
  if (esCargando) {
    divContainer.innerHTML = ''
    divContainer.style.textAlign = 'center'
    btnArmar.disabled = true
    btnArmar.style.backgroundColor = 'gray'
    btnArmar.style.cursor = 'auto'
    imagen.src = "./img/gif_cargando.gif";
    let imagen = document.createElement("img");
    const parrafo = document.createElement('h3')
    parrafo.innerHTML = 'Cargando...'
    divContainer.appendChild(parrafo);
    divContainer.appendChild(imagen);
  }
  else {
    btnArmar.disabled = false
    btnArmar.style.backgroundColor = '#96B6C5'
    btnArmar.style.cursor = 'pointer'
    divContainer.style.textAlign = 'left'
  }
}