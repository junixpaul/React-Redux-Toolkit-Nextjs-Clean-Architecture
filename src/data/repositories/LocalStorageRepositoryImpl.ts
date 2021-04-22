import { Todo } from "../../domain/entities/Todo"
import { TodoRepository } from "../../domain/repositories/TodoRepository"

class TodoDTO {
    id = 0
    todo = ""
    complete = false
    dateCreated = ""
    days = ""
}

export class TodoRepositoryImpl implements TodoRepository {
    jsonUrl = [
        { todo: "React Redux Clear Architecture", id: 0, complete: false, dateCreated: "2020-5-24", days: 20 },
        { todo: "Implementation", id: 1, complete: false, dateCreated: "2020-6-24", days: 10 },
    ]

    loadStorageData() {
        const todoList = localStorage.getItem("todo")
        return JSON.parse(todoList)
    }

    storageSave(item) {
        localStorage.setItem("todo", JSON.stringify(item))
        const datas = localStorage.getItem("todo")
        return JSON.parse(datas)
    }

    async GetTodo(): Promise<Todo[]> {
        const todo = []
        const listTodo = this.loadStorageData()
        console.log("--------------------------")
        console.log(listTodo)
        console.log("--------------------------")
        if(listTodo != null){
            listTodo.map((i, index) => todo.push(listTodo[index]))
        }
        return this.storageSave(todo)
    }

    async AddTodo(todo: any) {
        const todo_arr = []
        const listTodo = this.loadStorageData()
        if(listTodo != null){
            listTodo.map((i, index) => todo_arr.push(listTodo[index]))
        }
        todo_arr.push({
            todo: todo.todo,
            id: todo.id,
            complete: todo.complete,
            dateCreated: todo.dateCreated,
            days: todo.days,
        })

        return this.storageSave(todo_arr)
    }

    async RemoveTodo(todo: any): Promise<Todo[]> {
        const todo_arr = []
        const listTodo = this.loadStorageData()
        if(listTodo != null){
            listTodo.map((i, index) => todo_arr.push(listTodo[index]))
        }
        return this.storageSave(todo_arr.filter((item) => item.id !== todo.id))
    }

    async EditTodo(todo: any): Promise<Todo[]> {
        const todo_arr = []
        const listTodo = this.loadStorageData()
        if(listTodo != null){
            listTodo.map((i, index) => todo_arr.push(listTodo[index]))
        }
        const index = listTodo.findIndex((todos) => todos.id === todo.id),
            tod = [...listTodo]
        tod[index] = todo
        return this.storageSave(tod)
    }

    async MarkCompleteTodo(todo: any): Promise<Todo[]> {
        const todo_arr = []
        const listTodo = this.loadStorageData()
        if(listTodo != null){
            listTodo.map((i, index) => todo_arr.push(listTodo[index]))
        }
        const index = listTodo.findIndex((todos) => todos.id === todo.id),
            tod = [...listTodo]
        tod[index] = todo
        return this.storageSave(tod)
    }

    async GetDays(todo: any): Promise<Todo[]> {
        return todo.filter((i: any) => i.id !== undefined)
    }
}
