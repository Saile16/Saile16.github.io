let div=document.querySelector('.user');   
//verificar si existe algo en el localStorage
function obtener_localstorage(){
    if(localStorage.getItem("nombre")){
        let nombre=localStorage.getItem("nombre");
        div.style.display='none';
        return nombre;
    }
    else{
        div.style.display='block';
    }
}

//guardar estado en localstorage
function guardarNombre(){
    let nombre = document.getElementById("usuario").value;
    console.log(nombre);
    localStorage.setItem("nombre", nombre);
    div.style.display='none';
    return nombre;
}



    
// variable turno indica a que jugador le toca siendo 1 persona , 0 bot
let turno = 1;
let fichas = ["O", "X"];
// cantidad de movimientos o jugadas hechas
let jugadas = 0;
//para verificar si la partida a terminado
let partidaAcabada = false;
let textoVictoria = document.getElementById("textoVictoria");
// creamos un "array" de datos para los botones
let botones = Array.from(document.querySelectorAll(".juego-celda"));
// console.log(botones);
// a cada boton añadimos un event listener "click"
botones.forEach(x => x.addEventListener("click", ponerFicha));

function ponerFicha(event){
    if(localStorage.getItem("nombre")){
        nombre=obtener_localstorage();
    }else{
        nombre=guardarNombre();
    }
	let botonPulsado = event.target;
    // console.log(event.target);
    // comprobamos si la partida ya terminó o si el boton se encuentra vacio
	if(!partidaAcabada && botonPulsado.innerHTML == ""){
		botonPulsado.innerHTML = fichas[turno];
		jugadas += 1
        //llamamos a la funcion estado , devolvera un 1 si ganamos o un -1 si perdimos y 0 si no hay ganador
		let estadoPartida = estado();
		if(estadoPartida == 0){
			cambiarTurno();
			if(jugadas < 9){
                ia();
				estadoPartida = estado();
				jugadas += 1;
				cambiarTurno();	
			}	
		}
		
		if(estadoPartida == 1){
			textoVictoria.style.visibility = "visible";
            textoVictoria.innerHTML = `Has ganado ${nombre}`;
            mostrarGanador()
			partidaAcabada = true;
		}
		else if(estadoPartida == -1){
			textoVictoria.innerHTML = `Has perdido ${nombre}`
            mostrarGanador()
			partidaAcabada = true;
			textoVictoria.style.visibility = "visible";
		}
	}	
}
 
function cambiarTurno(){
        if(turno==1){
            turno = 0;
        }
        else{
            turno = 1;
        }
        /*
            Otra forma de hacerlo:
            turno += 1;
            turno %= 2;
        */
    
}

function estado(){
    //nos indica si hay un ganador y en que posicion se encuentra diagonal , horizontal , vertical
	posicionVictoria = 0;
    //0 partida continua, 1 ganador, -1 perdedor
	ganador = 0;
	function sonIguales(...args){
		valores = args.map(x=>x.innerHTML);
		if(valores[0] != "" && valores.every((x, i, arr) => x===arr[0])){
			args.forEach(x => x.style.backgroundColor = "#0693e3")
			return true;
		}
		else{
			return false;
		}
	}

	//Comprobamos si hay alguna linea en todas las posibilidades
	if(sonIguales(botones[0], botones[1], botones[2])){
		posicionVictoria = 1;
	}

	else if(sonIguales(botones[3], botones[4], botones[5])){
		posicionVictoria = 2;
	}

	else if(sonIguales(botones[6], botones[7], botones[8])){
		posicionVictoria = 3;
	}

	else if(sonIguales(botones[0], botones[3], botones[6])){
		posicionVictoria = 4;
	}

	else if(sonIguales(botones[1], botones[4], botones[7])){
		posicionVictoria = 5;
	}

	else if(sonIguales(botones[2], botones[5], botones[8])){
		posicionVictoria = 6;
	}

	else if(sonIguales(botones[0], botones[4], botones[8])){
		posicionVictoria = 7;
	}

	else if(sonIguales(botones[2], botones[4], botones[6])){
		posicionVictoria = 8;
	}

	//Comprobamos quien ha ganado
	if(posicionVictoria > 0){
		if(turno == 1){
			ganador = 1;
		}
		else{
			ganador = -1;
		}
	}

	return ganador;
}


//mostrar ganador
function mostrarGanador(){
    const modal_container = document.querySelector('.modal-container');
    const close = document.getElementById('close');
    modal_container.classList.add('show');  
    close.addEventListener('click', () => {
    modal_container.classList.remove('show');
    resetear();
    });
}
function resetear(){
    botones.forEach(x => x.innerHTML = "");
    botones.forEach(x => x.style.backgroundColor = "#eeeeee");
    textoVictoria.style.visibility = "hidden";
    partidaAcabada = false;
    jugadas = 0;
    turno = 1;
}
//simulamos la jugada del bot
function ia(){
	
    function aleatorio(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	let valores = botones.map(x=>x.innerHTML);
	let pos = -1;

	if(valores[4]==""){
		pos = 4;
	}
	else{
		let n = aleatorio(0,botones.length-1);
		while(valores[n]!=""){
			n = aleatorio(0, botones.length-1); 
		}
		pos = n;
	}
    // console.log(botones.length)
	botones[pos].innerHTML = "<span style='color:red'>O</span>";
	
}




