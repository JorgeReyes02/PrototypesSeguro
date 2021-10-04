//CONSTRUCTORES
function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Realiza la cotizacion
Seguro.prototype.cotizarSeguro = function(){
    /* 
    Algoritmo del seguro
    1 = Americano 1.15
    3 = Asiatico 1.05
    2 = Europeo 1.35
    */
   let cantidad;
   const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //Leer el año 
    const diferencia = new Date().getFullYear() - this.year;

    //Cada año que la diferencia es mayor el costo va a reducir un 3% el valor del seguro
    cantidad -= ((diferencia * 3) * cantidad ) / 100;
    console.log(cantidad);

    /*
    Si el seguro es basico se multiplica por un 30% mas
    Si el seguro es completo se multiplica por un 50% mas
    */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
};

function UI(){}

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear();
    const min = max-10;

    const selector = document.querySelector('#year');
    for(let i = max; i>=min; i--){
        let option = document.createElement('option');
        option.textContent = i;
        option.value = i;
        selector.appendChild(option);
      

    }
};
//Muestra alertas en Pantalla
UI.prototype.mostrarMensaje = (mensaje,tipo) => {
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);

};
const ui = new UI();
document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones();
});

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro);
    
}

function cotizarSeguro(e){
    e.preventDefault();

    //Leer la marca
    const marca = document.querySelector('#marca').value;
    
    //Leer el año
    const year = document.querySelector('#year').value;

    //Leer el tipo
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los Campos son Obligatorios','error');
        return;
    }
    ui.mostrarMensaje('Cotizando...','correcto');

    //Instanciar Seguro
    const seguro = new Seguro(marca,year,tipo);
    seguro.cotizarSeguro();
}