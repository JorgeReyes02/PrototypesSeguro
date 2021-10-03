//CONSTRUCTORES
function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

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
}
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

}
const ui = new UI();
document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones();
})

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
}