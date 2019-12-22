/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todasLasPreguntasEliminadas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  //var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
  obtenerUltimoId: function() {
    if(this.preguntas.length === 0){
      return 0;
    }
    else{
      return this.preguntas[this.preguntas.length - 1].id;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  // this.modelo.preguntas = [{‘textoPregunta’: “Mi primer Pregunta”, ‘id’: 0, 
  // ‘cantidadPorRespuesta’: [{‘textoRespuesta’: “mi unica respuesta”, ‘cantidad’: 2}]}]
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar(nuevaPregunta);
    
    this.preguntaAgregada.notificar();
  },

  eliminarPregunta: function(id){
    console.log('id que llego al modelo para eliminar', id)
    var posicionEnElModelo = this.buscarPreguntaEnElModelo(id);
    console.log('Posicion de la pregunta en el modelo: ', posicionEnElModelo)
    // localStorage.removeItem(localStorage.key(posicionEnElModelo));
    // var buscado = localStorage.getItem(this.preguntas[posicionEnElModelo].id)
    // var laPregunta = JSON.parse(buscado);
    this.preguntas.splice(posicionEnElModelo, 1);
    localStorage.removeItem(id);

    this.preguntaEliminada.notificar(); 
  },

  buscarPreguntaEnElModelo: function(id){
    var laPregunta = this.preguntas.find(function(unaPregunta){
      return unaPregunta.id == id;
    });

    return this.preguntas.indexOf(laPregunta);
  },

  editarPregunta: function(id, nuevoTexto){
    var posicion = this.buscarPreguntaEnElModelo(id);

    this.preguntas[posicion].textoPregunta = nuevoTexto;
    this.guardar(this.preguntas[posicion]);
    this.preguntaEditada.notificar();
  },

  eliminarTodasLasPreguntas: function(){
    this.preguntas = [];
    localStorage.clear();
    this.todasLasPreguntasEliminadas.notificar();
  },

  //se guardan las preguntas (localstorage)
  guardar: function(unaPregunta){
    localStorage.setItem(unaPregunta.id, JSON.stringify(unaPregunta));
    console.log('Longitud del Storage: ', localStorage.length)
  },

  recuperar: function(){  
    for (var i = 0; i < localStorage.length; i++){
      console.log(localStorage.key(i))
      var buscado = localStorage.getItem(localStorage.key(i));
      unaPregunta = JSON.parse(buscado);

      console.log('Recuperada del storage', unaPregunta)
      this.preguntas.push(unaPregunta);
    }
  },

  // unaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
  // unaRespuesta = {'textoRespuesta': respuesta, 'cantidad': cantVotos}
  agregarVoto: function(idPregunta, respuestaSeleccionada){
    var posicionDeLaPregunta = this.buscarPreguntaEnElModelo(idPregunta);
    
    var laRespuesta = this.preguntas[posicionDeLaPregunta].cantidadPorRespuesta.find(function(unaRespuesta){
      return unaRespuesta.textoRespuesta == respuestaSeleccionada;
    });
    posicionDeLaRespuesta = this.preguntas[posicionDeLaPregunta].cantidadPorRespuesta.indexOf(laRespuesta);

    this.preguntas[posicionDeLaPregunta].cantidadPorRespuesta[posicionDeLaRespuesta].cantidad++;
    this.guardar(this.preguntas[posicionDeLaPregunta]);
    this.votoAgregado.notificar();
  }

};