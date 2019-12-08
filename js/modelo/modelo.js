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
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  //var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
  obtenerUltimoId: function() {
    if(this.preguntas.length == 0){
      return 0;
    }
    else{
      return this.preguntas[this.preguntas.length-1].id;
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
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  eliminarPregunta: function(id){
    var laPregunta = this.preguntas.find(function(unaPregunta){
      return unaPregunta.id == id;
    });
    var posicion = this.preguntas.indexOf(laPregunta);
    this.preguntas.splice(posicion, 1);
    this.guardar();
    this.preguntaEliminada.notificar(); 
  },

  eliminarTodasLasPreguntas: function(){
    this.preguntas = [];
    this.guardar();
    this.todasLasPreguntasEliminadas.notificar();
  },

  editarPregunta: function(id, nuevoTexto){
    let pos = 0;

    while(this.preguntas[pos].id != id){
      pos++;
    }

    this.preguntas[pos].textoPregunta = nuevoTexto;
    this.guardar();
    this.preguntaEditada.notificar();
  },

  //se guardan las preguntas (localstorage)
  guardar: function(){
    if(this.preguntas.length == 0){
      return
    }
    else{
      this.preguntas.forEach(unaPregunta => localStorage.setItem(unaPregunta.id, JSON.stringify(unaPregunta)))
      console.log(JSON.parse(localStorage.getItem(this.preguntas[0].id)))
      console.log(this.preguntas[0])
    }
  },

};