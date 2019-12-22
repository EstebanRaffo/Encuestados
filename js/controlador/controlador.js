/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },

  editarPregunta: function(id, nuevoTexto){
    this.modelo.editarPregunta(id, nuevoTexto);
  },

  eliminarPregunta: function(id){
    this.modelo.eliminarPregunta(id);
  },

  eliminarTodasLasPreguntas: function(){
    this.modelo.eliminarTodasLasPreguntas();
  },

  recuperar: function(){
    this.modelo.recuperar();
  },

  agregarVoto: function(idPregunta,respuestaSeleccionada){
    this.modelo.agregarVoto(idPregunta, respuestaSeleccionada);
  }
};


