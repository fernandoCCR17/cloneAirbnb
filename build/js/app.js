// variables
const formulario = document.querySelector('#formulario');
let pass=true;

// eventos
document.addEventListener('DOMContentLoaded', escuchaEventos);

// funciones
function escuchaEventos(){
    formulario.addEventListener('submit', validarForm)
}

function validarForm(e){
    e.preventDefault();
    const inputs = document.querySelectorAll('.formulario__input');
    inputs.forEach(e => {
        const name = e.id.split('').map((a, i) => i === 0 ? a.toUpperCase() : a).join('')
        if(e.value.trim() === ''){
            mostrarAlerta(`${name} no puede ir vacio`, 'error', e.parentElement);
            pass = false;
        }else if(e.id === 'llegada'){
            verificaFecha(e.value, e);
        }else if(e.id === 'salida'){
            verificaFecha(e.value, e);
        }else if(e.id === 'Huespedes' && e.value < 1){
            mostrarAlerta(`El numero de huespedes no es valido`, 'error', e.parentElement);
            pass = false;
        }
    })
}

function verificaFecha(fechaInput, selector){
    const date = new Date(), fecha = fechaInput.split('-');
    const horaLlegada = document.querySelector('#llegada');
    
    if(fecha[0] < date.getFullYear() && fecha[1] < date.getMonth() + 1 && fecha[2] < date.getDate()){
        mostrarAlerta('El año, el mes y el día ya pasaron','error',selector.parentElement);
        pass = false;
    }else if(fecha[0] < date.getFullYear() && fecha[1] < date.getMonth() + 1){
        mostrarAlerta('El año y el mes ya pasaron','error',selector.parentElement);
        pass = false;
    }else if(fecha[0] < date.getFullYear()){
        mostrarAlerta('El año ya paso','error',selector.parentElement);
        pass = false;
    }else if(fecha[0] >= date.getFullYear() && fecha[1] < date.getMonth() + 1 && fecha[2] < date.getDate()){
        mostrarAlerta('El mes y el día ya pasaron','error',selector.parentElement);
        pass = false;
    }else if(fecha[0] >= date.getFullYear() && fecha[1] < date.getMonth() + 1){
        mostrarAlerta('El mes ya paso','error',selector.parentElement);
        pass = false;
    }else if(fecha[0] >= date.getFullYear() && fecha[1] >= date.getMonth() + 1 && fecha[2] < date.getDate()){
        mostrarAlerta('El día ya paso','error',selector.parentElement);
        pass = false;
    }else if(selector.id === 'salida' && horaLlegada.value.trim() != ''){
        const llegada = horaLlegada.value.split('-');
        console.log(fecha);
        console.log('--------------------');
        console.log(llegada);
        if(fecha[0] < llegada[0]){
            mostrarAlerta('La salida debe ser despues de la llegada','error',selector.parentElement);
            pass = false;
        }else if(fecha[0] >= llegada[0] && fecha[1] < llegada[1] + 1){
            mostrarAlerta('La salida debe ser despues de la llegada','error',selector.parentElement);
            pass = false;
        }else if(fecha[0] >= llegada[0] && fecha[1] >= llegada[1] + 1 && fecha[2] < llegada[2]){
            mostrarAlerta('La salida debe ser despues de la llegada','error',selector.parentElement);
            pass = false;
        }
    }
}

function mostrarAlerta(mensaje, tipo, selector){
    const pRepetido = selector.querySelector('.mensaje');
    const parrrafo = document.createElement('P');

    pRepetido ? pRepetido.remove() : '';
    parrrafo.classList.add('mensaje');
    parrrafo.textContent = mensaje;
    parrrafo.style.fontWeight = 'Bold';
    parrrafo.style.marginBlock = '.5rem';
    parrrafo.style.fontSize = '1.1rem';
    tipo === 'error' ? parrrafo.style.color = 'Red' : (parrrafo.style.color = 'Green', parrrafo.style.textAlign = 'center');
    selector.appendChild(parrrafo);

    setTimeout(() => {
        parrrafo.remove();
    }, 3000);
}