// How to mix between the reduce & context
// 1-CreateContext and the function reduce 
// 2- create the context provivder and pass the dispatch and state & surronding the App.js 
// 3- CREATE THE CUSTOM HOOK'S 
// 4- MOVE TO THE order componnet and import the custom hook and by the destrcturing bring the dispatch and the state by use this const {currentTodos,dispatch}= useTodoReduce()



import React, {
    createContext,
    useContext,
    useReducer
}
    from 'react';
    import { v4 as uuidv4 } from "uuid";




const todoContext = createContext({})




const reducer =(currentTodos,action)=>{

    switch(action.type){

        case("add"):{

        const newTodo = {
			id: uuidv4(),
			title: action.payload.newTitle2,
			details: "",
			isCompleted: false,
		};
        const updatedTodos= [...currentTodos, newTodo]

        localStorage.setItem("todos", JSON.stringify(updatedTodos));


		return updatedTodos ;
    }

    case "delete": {
        console.log(action.payload.dialogTodo)
        
        const updatedTodos = currentTodos.filter((t) => {
            return t.id !== action.payload.dialogTodo.id;
        });
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos; // Return the updated state
    }

    case "update": {
        const updatedTodos = currentTodos.map((t) => {
			if (t.id == action.payload.dialogTodo.id) {
				return {
					...t,
					title: action.payload.dialogTodo.title,
					details: action.payload.dialogTodo.details,
				};
			} else {
				return t;
			}
		});

		localStorage.setItem("todos", JSON.stringify(updatedTodos));
		return updatedTodos
		
    }
    

        case("checked"):{
            const {todo}=action.payload

            const updatedTodos = currentTodos.map((t) => {
                if (t.id == action.payload.todo.id) {
                    return{ ...t, isCompleted: !t.isCompleted }
                  
                }
                return t;
            });
            localStorage.setItem("todos", JSON.stringify(updatedTodos));

            return updatedTodos;
           
	
    }
    

        case("refresh"):{

            const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
            return storageTodos
	
    }
    
    default: {
        throw Error("Unknown Action " + action.type);
    }
}

}







export const TodoProvider =({children})=>{

    const [currentTodos,dispatch]= useReducer(reducer,[])

    return(
        <todoContext.Provider value={{currentTodos,dispatch}} >
            {children}
        </todoContext.Provider>
    )

}


export function useTodoReduce (){

   const reduceContext=  useContext(todoContext)

   if(!reduceContext){
    throw new Error(`useCounter must be used
                        within a TodoProvider`);
   }
   return reduceContext
    
}





