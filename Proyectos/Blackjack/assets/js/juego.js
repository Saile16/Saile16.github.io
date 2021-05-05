const miModulo = (() => {
  'use strict'
  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  // let puntosJugador = 0,
  //   puntosComputador = 0;
  let puntosJugadores = [];
  //REFERENCIAS DEL HTML
  const btnPedir = document.querySelector("#btnPedir");
  const btnDetener = document.querySelector("#btnDetener");
  const btnNuevo = document.querySelector("#btnNuevo");
  const puntosHtml = document.querySelectorAll("span");
  const divCartasJugadores = document.querySelectorAll(".cont-cartas");


  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHtml.forEach(ele => ele.innerText = 0);
    divCartasJugadores.forEach(ele => ele.innerHTML = "");

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  }
  //Esta funcion crea una baraja y shuffle lo pone al azar
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
      // deck.push(i+"C");
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }

    return _.shuffle(deck);
  };

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) :
      parseInt(valor);
    // let puntos = 0;
    // if (isNaN(valor)) {
    //    puntos = (valor === "A") ? 11 : 10;

    // } else {
    //    console.log("es un numero")
    //    puntos = parseInt(valor);
    // }
    // console.log(puntos)
  };

  //Turno:0= primer jugador y el ultimo sera computadora 

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add("cartas");
    divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputador] = puntosJugadores;
    setTimeout(() => {
      if (puntosComputador === puntosMinimos) {
        alert("Nadie gana");
      } else if (puntosMinimos > 21) {
        alert("Computador gana");
      } else if (puntosComputador > 21) {
        alert("Jugador GANA");
      } else {
        alert("Computador GANA");
      }
    }, 100);
  }

  const turnoComputadora = (puntosMinimos) => {
    let puntosComputador = 0;
    do {
      const carta = pedirCarta();
      puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputador < puntosMinimos && puntosMinimos <= 21);
    determinarGanador();
  };

  //EVENTOS}
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);
    if (puntosJugador > 21) {
      console.warn("Lo siento mucho perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador == 21) {
      console.warn("21,genial!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  // btnNuevo.addEventListener("click", () => {
  //   inicializarJuego();
  // });

  return {
    nuevoJuego: inicializarJuego
  };
})();


