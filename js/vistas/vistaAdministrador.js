/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function(){
    contexto.reconstruirLista();
  });

  this.modelo.todasLasPreguntasEliminadas.suscribir(function(){
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function(){
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    
    validacionDeFormulario();
    this.reconstruirLista();
    this.configuracionDeBotones();
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    
    if(preguntas.length === 0){
      this.controlador.recuperar();
      preguntas = this.modelo.preguntas;
    }

    for(var i = 0; i < preguntas.length; ++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    // completar
    
    // var unaRespuesta = {'textoRespuesta': respuesta, 'cantidad': cantVotos}
    // var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    
    // asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta" 
    var nuevoItem = $('<li>');
    nuevoItem.attr({'class': 'list-group-item', 'id': pregunta.id});
    nuevoItem.text(pregunta.textoPregunta);

    // this.modelo.preguntas = [{'textoPregunta': "Mi primer Pregunta", 'id': 0, 
    //                          'cantidadPorRespuesta': [{'textoRespuesta': "mi unica respuesta", 'cantidad': 2}]}]
    
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    
    return nuevoItem;
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      if(value === ''){
        alert('Debe ingresar una pregunta');
        return;
      }

      $('[name="option[]"]').each(function() {
        //completar
        // var unaRespuesta = {'textoRespuesta': respuesta, 'cantidad': cantVotos}
        textoDeRespuesta = $(this).val();
        if(textoDeRespuesta !== ''){
          respuestas.push({'textoRespuesta': textoDeRespuesta, 'cantidad': 0});
        }
      })

      if(respuestas.length === 0){
        alert('Debe ingresar al menos una respuesta');
        return;
      }

      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    
    //asociar el resto de los botones a eventos
    
    // Editar Pregunta
    $('#editarPregunta').click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      var nuevoTexto = prompt('Editar pregunta');
      contexto.controlador.editarPregunta(id, nuevoTexto);
    });

    // Borrar Pregunta
    $('#borrarPregunta').click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.eliminarPregunta(id);
    });

    // Borrar Encuesta
    $('#borrarTodo').click(function(){
      contexto.controlador.eliminarTodasLasPreguntas();
    });

  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
