
import { type } from '@testing-library/user-event/dist/type'
import React,{useReducer,useState,useRef} from 'react'

function Actividad() {

 

  const input = useRef(null)

  const [nombre,setNombre] = useState('')

  
    const valorInicial =[
      
    ]
        
    

    const reducer = (state,action) =>{
      switch(action.type){
        case '+':
          return state.map(valor => (action.payload === valor.id)
          ? {...valor,unidades: valor.unidades + 1}
          : valor
        )

        case '-':
          return state.map(valor => (action.payload === valor.id) && valor.unidades > 1
          ? {...valor,unidades: valor.unidades - 1}
          : valor
        )

        case 'x':
          return state.filter(valor => valor.id !== action.payload)

        case 'agregar':
          return [...state,action.payload]
        default:
          return state;
        
        
      }
    }
    
    const [articulo,dispatch] = useReducer(reducer,valorInicial)
    
  return (
    <>
    <div className='input'>
      <h4>Articulos</h4>
      <input type='text' value={nombre} onChange={(e)=> setNombre(e.target.value)} ref={input} ></input>
      <button onClick={()=>{dispatch({type:'agregar',payload:{id:Date.now(),nombre:nombre,unidades:1}});input.current.focus(); setNombre("");}}>Agregar</button>
    </div>
    <div className='1'>
        {articulo.map(producto => 
          <div key={producto.id} className='producto'>
            {producto.nombre} ({producto.unidades} unidades)
           
            <button onClick={()=>dispatch({type:'+',payload:producto.id})}>+</button>
            <button onClick={()=>dispatch({type:'-',payload:producto.id})}>-</button>
            <button onClick={()=>dispatch({type:'x',payload:producto.id})}>x</button>
            
          </div>
        )}
        
    </div>
    </>
  )
}

export default Actividad
