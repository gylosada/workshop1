/////////// LLAMO COSAS DEL HTML

// llamo al id del formulario
var formulario = document.getElementById("formulario")

// llamo al id de eliminar todo
var eliminarTodo = document.getElementById("eliminarTodo")

// llamo al id de ordenar az
var ordenar = document.getElementById("ordenarAZ")

// llamo al id de ordenar az
var ordenarReverse = document.getElementById("ordenarZA")

//llamo al id del formulario buscador y el boton buscar tarea
var buscardor = document.getElementById("buscador")
var buscarTarea = document.getElementById("buscar")

//llamo al id de mostrar todo
var mostrarTodo = document.getElementById("mostrar")

// llamo al div de tareas
var idCajaTareas= document.getElementById("cajaTareas")



// creo el constructor de tareas
var CrearTarea = function(tituloIngresado,descripcionIngresada){
	this.id = Date.now()
	this.titulo = tituloIngresado
	this.descripcion = descripcionIngresada
	this.estado = false
}



// creo el constructor de tareas
var editarTareaCreada = function(idHeredado, tituloIngresado,descripcionIngresada, estadoCambiar){
	this.id = idHeredado
	this.titulo = tituloIngresado
	this.descripcion = descripcionIngresada
	this.estado = estadoCambiar
}



var mostrarGeneral = function(arr){

	for (var i = 0; i < arr.length; i++) {		
		//creo la tarea individual del arr
		var tareaArr = arr[i]

		// Creo y lleno los espacios para el html
		var cajaTarea = document.createElement("div")
		cajaTarea.setAttribute("id", tareaArr.id);
		idCajaTareas.appendChild(cajaTarea)

		// llamo al h3 y lo lleno
		var tituloTarea = document.createElement("h3")
		var textoDelTitulo = document.createTextNode(tareaArr.titulo)
		tituloTarea.appendChild(textoDelTitulo)
		cajaTarea.appendChild(tituloTarea)

		// llamo al p y lo lleno
		var descripcionTarea = document.createElement("p")
		var descAAgregar= document.createTextNode(tareaArr.descripcion)
		descripcionTarea.appendChild(descAAgregar)
		cajaTarea.appendChild(descripcionTarea)
		

		//creo la caja para los botones
		var cajaBotones = document.createElement("div")
		cajaTarea.appendChild(cajaBotones)

		///// Creo y lleno los tres botones
		var linkBorrarTarea = document.createElement("button")
		linkBorrarTarea.setAttribute("id", "bor" + tareaArr.id);
		cajaBotones.appendChild(linkBorrarTarea)
		
		var linkEditarTarea = document.createElement("button")
		linkEditarTarea.setAttribute("id", "edi" + tareaArr.id);
		cajaBotones.appendChild(linkEditarTarea)

		var linkEstadoTarea = document.createElement("button")
		linkEstadoTarea.setAttribute("id", "est" + tareaArr.id);
		cajaBotones.appendChild(linkEstadoTarea)


		///// le agrego las clases para ver los íconos
		linkBorrarTarea.classList.add("ion-close-round")
		linkEditarTarea.classList.add("ion-edit")
		linkEstadoTarea.classList.add("ion-checkmark-round")
	

		//// chequea si agregar clase de tarea completa al mostrar
		if(tareaArr.estado){
			cajaTarea.classList.add("completa")
		} else{
			cajaTarea.classList.remove("completa")
		}

		//////////// les agrego los eventos onclick
		linkBorrarTarea.addEventListener("click", function(){

			var idNuevo = event.currentTarget.id.substring(3)
			localStorage.removeItem(idNuevo)

			// elimino lo que se ve del LS
			if(idCajaTareas.hasChildNodes()){
				//console.log("tengo hijos")
				for(var i=0; i<localStorage.length; i++){
					var idTarea = JSON.parse(localStorage.getItem(localStorage.key(i))).id
					document.getElementById(idTarea).remove();
				}
			}

			location.reload();
		})

		linkEstadoTarea.addEventListener("click", function(){
			var idNuevo = event.currentTarget.id.substring(3)

			console.log(document.getElementById(idNuevo).className=="completa")

			if(document.getElementById(idNuevo).className=="completa"){
				console.log("entro al if, estaba true")
				for(var i=0; i<localStorage.length; i++){
					var itemLS = JSON.parse(localStorage.getItem(localStorage.key(i)))
					if(idNuevo==itemLS.id){
						var agregarTarea = new editarTareaCreada(idNuevo, itemLS.titulo, itemLS.descripcion, false)
						localStorage.setItem(idNuevo, JSON.stringify(agregarTarea))
						console.log("entro al if 2, quedo: " + agregarTarea.estado)
					}	
				}
			} else{
				for(var i=0; i<localStorage.length; i++){
					var itemLS = JSON.parse(localStorage.getItem(localStorage.key(i)))
					if(idNuevo==itemLS.id){
						var agregarTarea = new editarTareaCreada(idNuevo, itemLS.titulo, itemLS.descripcion, true)
						localStorage.setItem(idNuevo, JSON.stringify(agregarTarea))
						console.log("entro al if 2, quedo: " + agregarTarea.estado)
					}	
				}
			}
			location.reload();	
		})

		linkEditarTarea.addEventListener("click", function(){

			var idNuevo = event.currentTarget.id.substring(3)


			// elimino lo que ya se ve del LS
			if(idCajaTareas.hasChildNodes()){
				//console.log("tengo hijos")
				for(var i=0; i<localStorage.length; i++){
					var idTarea = JSON.parse(localStorage.getItem(localStorage.key(i))).id
					document.getElementById(idTarea).remove();
				}
			}

			// ingreso nuevo nombre y lo valido que el nuevo nombre tampoco exista
			var tituloEstaRepetido = true
			
			while(tituloEstaRepetido){
				var nuevoTitulo = prompt("Ingrese un título", "Nuevo título")
				var tituloValido = true
				for(var i = 0; i < localStorage.length; i++){
					var tareaFormateada = JSON.parse(localStorage.getItem(localStorage.key(i)))
					if(nuevoTitulo == tareaFormateada.titulo){
						tituloValido = false
						alert("Esa tarea ya existe")
					}
				}
				if (tituloValido){
					tituloEstaRepetido = false
				}
			}

			//ingreso nueva descripcion
			var nuevaDesc = prompt("Editar descripción", "Cerrar las cosas que quedan, y subirlo al github")

			//creo el obj con los nuevos valores
			var agregarTarea = new editarTareaCreada(idNuevo, nuevoTitulo, nuevaDesc, false)

			//los cargo pisando el obj original
			localStorage.setItem(idNuevo, JSON.stringify(agregarTarea))

			location.reload();
		})
	}
}

////////// función que oculta antes de otra función
var ocultarMostrar = function(){

	// elimino lo que se ve del LS
	if(idCajaTareas.hasChildNodes()){
		for(var i=0; i<localStorage.length; i++){
			var idTarea = JSON.parse(localStorage.getItem(localStorage.key(i))).id
			document.getElementById(idTarea).remove();
		}
	}
}


////////// función que muestra al abrir la pagina
var mostrarAutomatico = function(arr){

	var arrMostrar = []

	//subo el LS al array
	for(var i=0; i<localStorage.length; i++){
		arrMostrar.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
	}

	mostrarGeneral(arrMostrar);
}


////////// funcion que ejecuta el formulario de agregar tarea
formulario.onsubmit = function(event){

	// llamó las variables ingresadas en el formulario
	var tituloIngresado= formulario[0].value
	var descripcionIngresada= formulario[1].value

	// funcion que agrega tarea
	var agregarTarea = function(tituloIngresado,descripcionIngresada){
		
		for (var i = 0; i < localStorage.length; i++) {
			var tareaFormateada = JSON.parse(localStorage.getItem(localStorage.key(i)))
			if(tituloIngresado === tareaFormateada.titulo){
				return alert("Esa tarea ya existe")
			}
		}

		var tareaAgregada = new CrearTarea(tituloIngresado,descripcionIngresada)
		
		//guardar en el localstorage
		localStorage.setItem(tareaAgregada.id, JSON.stringify(tareaAgregada))
	}

	agregarTarea(tituloIngresado,descripcionIngresada)
}


////////// funcion que busca por titulo
buscador.onsubmit = function(event){
	
	var busquedaIngresada = buscador[0].value
	var arrTareaEncontrada = []

	for(var i=0; i < localStorage.length; i++){
		var tareaLS = (JSON.parse(localStorage.getItem(localStorage.key(i))))
		//si es dif se oculta
		if(busquedaIngresada == tareaLS.titulo){
			console.log(tareaLS.titulo)
			arrTareaEncontrada.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
		}
	}

	ocultarMostrar();

	mostrarGeneral(arrTareaEncontrada)

	event.preventDefault();
}


////////// funcion que elimina todas las tareas
eliminarTodo.onclick = function(event){
	//borro el local storage
	localStorage.clear()

	location.reload()
}


////////// funcion que muestra todas las tareas
mostrarTodo.onclick = function(event){

	location.reload();
}


////////// funcion que ordena AZ
ordenar.onclick = function(event){
	
	var arrTituloTareas = []

	// itero el localStorage para cargar tareas en mi array
	for(var i=0; i<localStorage.length; i++){
		arrTituloTareas.push(JSON.parse(localStorage.getItem(localStorage.key(i))).titulo)
	}

	arrTituloTareas.sort()

	// creo un arr nuevo para poner las tareas
	var arrOrdenado = []

	var reconstruyoMiObj = function(){
		// comparo el array con el LS
		for(var i=0; i<arrTituloTareas.length; i++){
			for(var j=0; j<localStorage.length; j++){
				if(arrTituloTareas[i] == JSON.parse(localStorage.getItem(localStorage.key(j))).titulo){
					//le subo las tareas ordenadas
					arrOrdenado.push(JSON.parse(localStorage.getItem(localStorage.key(j))))
				}
			}
		}
	}();

	ocultarMostrar();
	mostrarGeneral(arrOrdenado)
}


////////// funcion que ordena ZA
ordenarReverse.onclick = function(event){
	
	var arrTituloTareas = []

	// itero el localStorage para cargar tareas en mi array
	for(var i=0; i<localStorage.length; i++){
		arrTituloTareas.push(JSON.parse(localStorage.getItem(localStorage.key(i))).titulo)
	}

	arrTituloTareas.sort()
	arrTituloTareas.reverse()

	// creo un arr nuevo para poner las tareas
	var arrOrdenadoRev = []

	var reconstruyoMiObj = function(){
		// comparo el array con el LS
		for(var i=0; i<arrTituloTareas.length; i++){
			for(var j=0; j<localStorage.length; j++){
				if(arrTituloTareas[i] == JSON.parse(localStorage.getItem(localStorage.key(j))).titulo){
					//le subo las tareas ordenadas
					arrOrdenadoRev.push(JSON.parse(localStorage.getItem(localStorage.key(j))))
				}
			}
		}
	}();

	ocultarMostrar();
	mostrarGeneral(arrOrdenadoRev)
}


