const cartasTotales = 21
const cartasRepartidas = 6
let jugadas = [];
let contadorJugadas = 0
let ultimaTirada = {}

//obteniendo elementos del html 

//pantallas 
let pantallaPrincipal = document.getElementById('principal')
let pantallaLoader = document.getElementById('loader')
let pantallaCarrusel = document.getElementById('carruselCartas')
let pantallaResultados = document.getElementById('resultados')

//estado inicial de las pantallas
pantallaLoader.style.display = 'none'
pantallaCarrusel.style.display = 'none'
pantallaResultados.style.display = 'none'

//pantalla principal
let jugador1 = document.getElementById('jugadorUnoInput')
let jugador2 = document.getElementById('jugadorDosInput')

//slide 1
let tituloSlide1Jugador = document.getElementById('tituloSlide1Jugador')
let imagenSlide1Carta = document.getElementById('imagenSlide1Carta')
let nombreCartaSlide1 = document.getElementById('nombreCartaSlide1')
let descripcionSlide1 = document.getElementById('descripcionSlide1')
//slide 2
let tituloSlide2Jugador = document.getElementById('tituloSlide2Jugador')
let imagenSlide2Carta = document.getElementById('imagenSlide2Carta')
let nombreCartaSlide2 = document.getElementById('nombreCartaSlide2')
let descripcionSlide2 = document.getElementById('descripcionSlide2')
//slide 3
let tituloSlide3Jugador = document.getElementById('tituloSlide3Jugador')
let imagenSlide3Carta = document.getElementById('imagenSlide3Carta')
let nombreCartaSlide3 = document.getElementById('nombreCartaSlide3')
let descripcionSlide3 = document.getElementById('descripcionSlide3')
//slide 4
let tituloSlide4Jugador = document.getElementById('tituloSlide4Jugador')
let imagenSlide4Carta = document.getElementById('imagenSlide4Carta')
let nombreCartaSlide4 = document.getElementById('nombreCartaSlide4')
let descripcionSlide4 = document.getElementById('descripcionSlide4')
//slide 5
let tituloSlide5Jugador = document.getElementById('tituloSlide5Jugador')
let imagenSlide5Carta = document.getElementById('imagenSlide5Carta')
let nombreCartaSlide5 = document.getElementById('nombreCartaSlide5')
let descripcionSlide5 = document.getElementById('descripcionSlide5')
//slide 6
let tituloSlide6Jugador = document.getElementById('tituloSlide6Jugador')
let imagenSlide6Carta = document.getElementById('imagenSlide6Carta')
let nombreCartaSlide6 = document.getElementById('nombreCartaSlide6')
let descripcionSlide6 = document.getElementById('descripcionSlide6')

//resultados de jugada
let resultadoNombreJugador1= document.getElementById('resultadoNombreJugador1')
let imagenResultadosJ1I1= document.getElementById('imagenResultadosJ1I1')
let pieResultadosJ1I1 = document.getElementById('pieResultadosJ1I1')
let imagenResultadosJ1I2= document.getElementById('imagenResultadosJ1I2')
let pieResultadosJ1I2 = document.getElementById('pieResultadosJ1I2')
let imagenResultadosJ1I3= document.getElementById('imagenResultadosJ1I3')
let pieResultadosJ1I3 = document.getElementById('pieResultadosJ1I3')
let resultadoNombreJugador2= document.getElementById('resultadoNombreJugador2')
let imagenResultadosJ2I1= document.getElementById('imagenResultadosJ2I1')
let pieResultadosJ2I1 = document.getElementById('pieResultadosJ2I1')
let imagenResultadosJ2I2= document.getElementById('imagenResultadosJ2I2')
let pieResultadosJ2I2 = document.getElementById('pieResultadosJ2I2')
let imagenResultadosJ2I3= document.getElementById('imagenResultadosJ2I3')
let pieResultadosJ2I3 = document.getElementById('pieResultadosJ2I3')
let matchNo = document.getElementById('matchNo')
let matchSi = document.getElementById('matchSi')
let botonGuardar = document.getElementById('resultadosGuardarBtn')

//lista de jugadas en pantalla principal

let listaJugadas = document.getElementById('listaJugadas')


// genero numero random

let numeroRandom = (min, max) =>{
    let random = Math.round(Math.random()*(max-min)+min);
    return random
};

//establezco array con cartas seleccionadas con la condicion de no repeticion 

let generadorDeTirada =()=>{
    let tirada = []
    for(i=0; i<cartasRepartidas;i++){
        let cartaRandom = numeroRandom(0, cartasTotales)
        if(tirada.includes(cartaRandom)){
            i--
        }else{
            tirada.push(cartaRandom)
        }
    }
    return tirada
} 

// establezco criterio de mach entre cartas
// si la sumatoria de los elementos del array de jugada es par entonces match 
//de lo contrario no hay match

let matchpar =(array)=>{
    let reducer = (accumulator, curr) => accumulator + curr;
    let sumatoria = array.reduce(reducer)
    let match = sumatoria%2 ==0 ? true : false;
    return match
}

// funcion para tomar los valores de jugadores y crear el objeto de la jugada

let jugar =()=>{    
    let jugadorUno = jugador1.value;
    let jugadorDos = jugador2.value;
    if (jugadorUno !="" && jugadorDos !=""){
    contadorJugadas++
    let cartasJugadas = generadorDeTirada();
    let resultadoJugada = {
        idJugada: contadorJugadas,
        match: matchpar(cartasJugadas),
        NombreJugador1 : jugadorUno,
        NombreJugador2 : jugadorDos,
        cartasJugador1 : [cartasJugadas[0], cartasJugadas[1], cartasJugadas[2]],
        cartasJugador2 : [cartasJugadas[3], cartasJugadas[4], cartasJugadas[5]],
    } 
    completarCarrusel(resultadoJugada)
    botonGuardar.style.display = 'inline-block'
    completarResultados(resultadoJugada)
    cargarJugada(pantallaPrincipal)
    ultimaTirada = resultadoJugada
    }
    else {
        alert('debe indicar los nombres de los dos jugadores')
    }
}

//funcion para completar el carrusel a partir de un objeto dado

let completarCarrusel =(objetoResultadoJugada)=> {
    //slide 1
    tituloSlide1Jugador.innerHTML = objetoResultadoJugada.NombreJugador1
    imagenSlide1Carta.setAttribute("src", data[objetoResultadoJugada.cartasJugador1[0]].img) 
    nombreCartaSlide1.innerHTML = data[objetoResultadoJugada.cartasJugador1[0]].nombre
    descripcionSlide1.innerHTML= data[objetoResultadoJugada.cartasJugador1[0]].significado
    //slide 2
    tituloSlide2Jugador.innerHTML = objetoResultadoJugada.NombreJugador1
    imagenSlide2Carta.setAttribute("src", data[objetoResultadoJugada.cartasJugador1[1]].img) 
    nombreCartaSlide2.innerHTML = data[objetoResultadoJugada.cartasJugador1[1]].nombre
    descripcionSlide2.innerHTML= data[objetoResultadoJugada.cartasJugador1[1]].significado
    //slide 3
    tituloSlide3Jugador.innerHTML = objetoResultadoJugada.NombreJugador1
    imagenSlide3Carta.setAttribute("src", data[objetoResultadoJugada.cartasJugador1[2]].img) 
    nombreCartaSlide3.innerHTML = data[objetoResultadoJugada.cartasJugador1[2]].nombre
    descripcionSlide3.innerHTML= data[objetoResultadoJugada.cartasJugador1[2]].significado
    //slide 4
    tituloSlide4Jugador.innerHTML = objetoResultadoJugada.NombreJugador2
    imagenSlide4Carta.setAttribute("src", data[objetoResultadoJugada.cartasJugador2[0]].img) 
    nombreCartaSlide4.innerHTML = data[objetoResultadoJugada.cartasJugador2[0]].nombre
    descripcionSlide4.innerHTML= data[objetoResultadoJugada.cartasJugador2[0]].significado
    //slide 5
    tituloSlide5Jugador.innerHTML = objetoResultadoJugada.NombreJugador2
    imagenSlide5Carta.setAttribute("src", data[objetoResultadoJugada.cartasJugador2[1]].img) 
    nombreCartaSlide5.innerHTML = data[objetoResultadoJugada.cartasJugador2[1]].nombre
    descripcionSlide5.innerHTML= data[objetoResultadoJugada.cartasJugador2[1]].significado
    //slide 6
    tituloSlide6Jugador.innerHTML = objetoResultadoJugada.NombreJugador2
    imagenSlide6Carta.setAttribute("src", data[objetoResultadoJugada.cartasJugador2[2]].img) 
    nombreCartaSlide6.innerHTML = data[objetoResultadoJugada.cartasJugador2[2]].nombre
    descripcionSlide6.innerHTML= data[objetoResultadoJugada.cartasJugador2[2]].significado

}

//funcion para completar los resultados de la partida a partir de un objeto

let completarResultados=(objetoResultadoJugada)=>{
    resultadoNombreJugador1.innerHTML = objetoResultadoJugada.NombreJugador1
    imagenResultadosJ1I1.setAttribute("src", data[objetoResultadoJugada.cartasJugador1[0]].img)
    pieResultadosJ1I1.innerHTML = data[objetoResultadoJugada.cartasJugador1[0]].nombre
    imagenResultadosJ1I2.setAttribute("src", data[objetoResultadoJugada.cartasJugador1[1]].img)
    pieResultadosJ1I2.innerHTML = data[objetoResultadoJugada.cartasJugador1[1]].nombre
    imagenResultadosJ1I3.setAttribute("src", data[objetoResultadoJugada.cartasJugador1[2]].img)
    pieResultadosJ1I3.innerHTML = data[objetoResultadoJugada.cartasJugador1[2]].nombre
    resultadoNombreJugador2.innerHTML = objetoResultadoJugada.NombreJugador2
    imagenResultadosJ2I1.setAttribute("src", data[objetoResultadoJugada.cartasJugador2[0]].img)
    pieResultadosJ2I1.innerHTML = data[objetoResultadoJugada.cartasJugador2[0]].nombre
    imagenResultadosJ2I2.setAttribute("src", data[objetoResultadoJugada.cartasJugador2[1]].img)
    pieResultadosJ2I2.innerHTML = data[objetoResultadoJugada.cartasJugador2[1]].nombre
    imagenResultadosJ2I3.setAttribute("src", data[objetoResultadoJugada.cartasJugador2[2]].img)
    pieResultadosJ2I3.innerHTML = data[objetoResultadoJugada.cartasJugador2[2]].nombre
    if (objetoResultadoJugada.match){
    matchSi.style.display = 'flex'
    matchNo.style.display = 'none'
    } else{
    matchSi.style.display = 'none'    
    matchNo.style.display = 'flex'
    }
}


//funcion para listar las jugadas realizadas, utiliza como fuente el array 'listaJugadas'
let completarListaJugadas=()=>{
    if(jugadas.length>0){
        listaJugadas.style.display = 'block'
    }else{
        listaJugadas.style.display = 'none'
    }
    listaJugadas.innerHTML = '<h3>Lista de Jugadas</h3>'
    jugadas.forEach(element => {
        let textoJugadores = `${element.NombreJugador1} & ${element.NombreJugador2}`
        let indicador = element.idJugada
        let nuevoItem = `<div><h5>${textoJugadores}</h5><div class="botonesListaJugadas"><button type="button" class="btn" onclick="borrarJugada('${indicador}')">🗑</button><button type="button" class="btn"  onclick="verResultados('${indicador}')">👁</button></div></div>` 
        listaJugadas.innerHTML+= nuevoItem
    });
}


//funcion para visualizar los resultados de la partida desde la lista de pantalla principal
let verResultados=(id)=>{
    jugadas.forEach(element => {
        if(element.idJugada == id){
            completarResultados(element)
            botonGuardar.style.display = 'none'
            irAResultados()
        }
    });
}

let borrarJugada=(id)=>{
    jugadas.forEach(element => {
        if(element.idJugada == id){
            let indice= jugadas.indexOf(element)
            jugadas.splice(indice,1)
            console.log(jugadas)
            completarListaJugadas()
        }
    });
}

//funcion para guardar jugadas en el array y reseteo de la jugada actual(solo se va a poder acceder a la jugada desde la lista de partidas)
let guardarJugada=()=>{
    jugadas.push(ultimaTirada)
    ultimaTirada={}
    completarListaJugadas()
    irAPrincipal()
    jugador1.value=""
    jugador2.value=""
}

let verResultadosJugadaActual = () =>{
    pantallaCarrusel.style.display = 'none'
    pantallaResultados.style.display = 'flex'
}

let volverATirar = () =>{
    jugar()
    cargarJugada(pantallaCarrusel)
}

//funcion para generar pantalla de carga de 3 segundos desde una pantalla de origen
let cargarJugada = (pantallaOrigen) =>{
    pantallaOrigen.style.display = 'none'
    pantallaLoader.style.display = 'flex'
    setTimeout( ()=> {
        pantallaLoader.style.display='none'
        pantallaCarrusel.style.display = 'block'
    }, 3000)  

}

let irAPrincipal =()=>{
    pantallaResultados.style.display='none'
    pantallaPrincipal.style.display='flex'
}

let irAResultados = ()=>{
    pantallaResultados.style.display='flex'
    pantallaPrincipal.style.display='none'
}   



//estableciendo conexion con html y agregando listeners
let botonVoyATenerSuerte = document.getElementById('voyATenerSuerte').addEventListener('click', jugar)
let botonGuardarJugada = botonGuardar.addEventListener('click', guardarJugada)
let botonResultadosModal = document.getElementById('verResultadosModal').addEventListener('click', verResultadosJugadaActual)
let botonVolverATirarModal = document.getElementById('volverATirarModal').addEventListener('click', volverATirar)
let salirDeResultados = document.getElementById('salirResultados').addEventListener('click', irAPrincipal)
let salirDeResultadosX = document.getElementById('salirResultadosX').addEventListener('click', irAPrincipal)
window.onload = completarListaJugadas()



