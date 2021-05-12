import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RootState } from "../store"

import { TodoServiceImpl } from "../../../domain/usecases/TodoService"
import { TodoRepositoryImpl } from "../../../data/repositories/LocalStorageRepositoryImpl"
import { Todo } from "../../../domain/entities/Todo"
// Define a type for the slice state
interface CounterState {
    loading: boolean
    todo: Array<Todo>
}

// Define the initial state using that type
const initialState: CounterState = {
    loading: false,
    todo: [],
}

export const fetchList = createAsyncThunk("todoList/fetchList", async () => {
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoServiceImpl(todoRepo)
    const todo = await todoService.GetTodo()
    return await todoService.GetDays(todo)

})
export const addTodo =  createAsyncThunk("todoList/addTodo", async (todoData) => {
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoServiceImpl(todoRepo)
    const todo = await todoService.AddTodo(todoData)
    return await todoService.AddTodo(todo)
})
export const removeTodo = createAsyncThunk("todoList/removeTodo", async (todoData) => {
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoServiceImpl(todoRepo)
    return await todoService.RemoveTodo(todoData)
})
export const editTodo = createAsyncThunk("todoList/editTodo", async (todoData) => {
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoServiceImpl(todoRepo)
    return await todoService.EditTodo(todoData)
})

export const markComplete = createAsyncThunk("todoList/markTodo", async (todoData) => {
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoServiceImpl(todoRepo)
    const todo = await todoService.MarkCompleteTodo(todoData)
    return await todoService.GetDays(todo)
})
export const todoSlice = createSlice({
    name: "todoList",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addTodo(state, action){
            return {
                ...state,
                todo: action.payload,
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchList.fulfilled, (state, action) => {
            return {
                ...state,
                todo: action.payload,
                loading: false,
            }
        })
        builder.addCase(fetchList.pending, (state) => {
            return {
                ...state,
                loading: true,
            }
        })
        builder.addCase(fetchList.rejected, (state) => {
            return {
                ...state,
                loading: false,
            }
        })
        builder.addCase(addTodo.fulfilled, (state, action) => {
            return {
                ...state,
                todo: action.payload,
                loading: false,
            }
        })
        builder.addCase(addTodo.pending, (state) => {
            return {
                ...state,
                loading: true,
            }
        })
        builder.addCase(addTodo.rejected, (state) => {
            return {
                ...state,
                loading: false,
            }
        })
        builder.addCase(removeTodo.fulfilled, (state, action) => {
            return {
                ...state,
                todo: action.payload,
                loading: false,
            }
        })
        builder.addCase(removeTodo.pending, (state) => {
            return {
                ...state,
                loading: true,
            }
        })
        builder.addCase(removeTodo.rejected, (state) => {
            return {
                ...state,
                loading: false,
            }
        })
        builder.addCase(editTodo.fulfilled, (state, action) => {
            return {
                ...state,
                todo: action.payload,
                loading: false,
            }
        })
        builder.addCase(editTodo.pending, (state) => {
            return {
                ...state,
                loading: true,
            }
        })
        builder.addCase(editTodo.rejected, (state) => {
            return {
                ...state,
                loading: false,
            }
        })

    },
})

// Other code such as selectors can use the imported `RootState` type
export const todo = (state: RootState) => state.todos.todo

export default todoSlice.reducer