import React from "react";
import { nanoid } from 'nanoid';




function App() {


  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion ] = React.useState(false)
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null)

  
  const agregarTarea = e => {
    e.preventDefault()
    /* El método trim( ) elimina los espacios en blanco en ambos extremos del string. */
    if(!tarea.trim()){
      console.log('Elemento vacio')
      setError('Escriba algo por favor...')
      return
    }
    console.log(tarea)


    setTareas([
      ...tareas, 
      { id: nanoid(10), nombreTarea: tarea }
    ])

    setTarea('')
    setError(null)
  }



const eliminarTarea = id => {
  const arrayFiltrado = tareas.filter(item => item.id !== id)
  setTareas(arrayFiltrado)

}


const editar = item => {
  console.log(item)
  setModoEdicion(true)
  setTarea(item.nombreTarea)
  setId(item.id)
}


/* ---- 'editarTarea' SE EJECUTA CUANDO APRETAMOS EL BOTON "EDITAR... es el que modifica el array"----- */

const editarTarea = e => {
  e.preventDefault()
  if(!tarea.trim()){
    console.log('elemento vacío')
    setError ('Escriba algo porfavor...')
    return
  }

  const arrayEditado = tareas.map(item => item.id === id ? {id:id, nombreTarea:tarea} : item )  
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
}






  return (
    <div className="container rounded-3 neg">

      <h1 className="text-center">ACTIVIDADES PENDIENTES</h1>
      <hr />
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-7 rounded-3 lista">
          <br />
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-gorup">
{/* --------- DESDE ACA AGREGAMOS EL ELEMENTO A LA LISTA DE TAREAS-------------  */}

              {
                tareas.length === 0 ? (
                  <li className="list-group-item">NO HAY TAREAS</li>
                ) : (

                    tareas.map(item => (
                      <li className="list-group-item" key={item.id} >
                      <span className="lead">{item.nombreTarea}</span>
      
                      <button 
                      className="btn btn-danger btn-sm float-right float-end mx-2"
                      onClick={() => eliminarTarea(item.id) }
                      >
                        Eliminar
                      </button>
      
      
      
                      <button 
                      className="btn btn-warning btn-sm float-right float-end"
                      onClick={() => editar(item)}
                      >
                        Editar
                      </button>
      
                    </li>
                    ))
                  
                  
                  )
                
              }

{/*             {
              tareas.map(item => (
                <li className="list-group-item" key={item.id} >
                <span className="lead">{item.nombreTarea}</span>

                <button 
                className="btn btn-danger btn-sm float-right float-end mx-2"
                onClick={() => eliminarTarea(item.id) }
                >
                  Eliminar
                </button>



                <button 
                className="btn btn-warning btn-sm float-right float-end"
                onClick={() => editar(item)}
                >
                  Editar
                </button>

              </li>
              ))
            } */}



          </ul>
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-1">
          
          <br />

        </div>

        

        <div className="col-12 col-sm-12 col-md-12 col-lg-4 rounded-3 formulario">

        <br />

        <h4 className="text-center">{/* ------ AQUI ESTABA ANTES EL titulo  formulario----------- */}
          {
          modoEdicion ? 'Editar tarea' : 'Agregar tarea' /* ---- ahora lo cambia con un OPERADOR TERNARIO: true EDITA, false AGREGA---- */
          }
        </h4>

        <form onSubmit={ modoEdicion ? editarTarea : agregarTarea }> {/* ------- F O R M U L A R I O ----------- */}
        {
          error ? <span className="text-danger"> {error} </span> : null
        }
          <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Ingrese Tarea"
          onChange={ e => setTarea(e.target.value)}
          value={tarea} /* para limpiar el formulario.. pasandole directamente el estado.. y al estado le pasa un setTarea vacio para que se limpie el casillero */
          />

          {modoEdicion ? (<button className="btn btn-warning d-grid col-12 mx-auto" type="submit">EDITAR</button> ) : (<button className="btn btn-dark d-grid col-12 mx-auto" type="submit">AGREGAR</button> ) }

          
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
