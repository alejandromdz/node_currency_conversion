let nextTodoId = 0
export const addTodo = (text:string) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter:any) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id:any) => ({
  type: 'TOGGLE_TODO',
  id
})
