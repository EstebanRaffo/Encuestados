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

  eliminarPregunta: function(id){
    this.modelo.eliminarPregunta(id);
  },

  eliminarTodasLasPreguntas: function(){
    this.modelo.eliminarTodasLasPreguntas();
  },

  editarPregunta: function(id, nuevoTexto){
    this.modelo.editarPregunta(id, nuevoTexto);
  },

  recuperar: function(){
    this.modelo.recuperar();
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    
  }
};


