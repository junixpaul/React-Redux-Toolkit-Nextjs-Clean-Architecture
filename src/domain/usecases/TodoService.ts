import { Todo } from "../entities/Todo"
import { TodoRepository } from "../repositories/TodoRepository"

export class TodoServiceImpl {
    todoRepo: TodoRepository

    constructor(td: TodoRepository) {
        this.todoRepo = td
    }

    async GetTodo(): Promise<Todo[]> {
        return this.todoRepo.GetTodo()
    }

    async AddTodo(todo: any): Promise<Todo[]> {
        const date_now = new Date()
        const today = date_now.getFullYear() + "-" + (date_now.getMonth() + 1) + "-" + date_now.getDate()
        const date_from = new Date(today)
        const diffInMs = Math.abs(date_from.valueOf() - date_now.valueOf())
        const fnal = diffInMs / (1000 * 60 * 60 * 24)
        const todos = { id: todo.id, todo: todo.todo, complete: false, dateCreated: today, days: Math.round(fnal) }
        return this.todoRepo.AddTodo(todos)
    }

    async RemoveTodo(todo: any): Promise<Todo[]> {
        if (todo.complete == true) {
            throw alert("Unable to Delete. Todo Already Mark as Completed")
        }
        return this.todoRepo.RemoveTodo(todo)
    }

    async EditTodo(todo: any): Promise<Todo[]> {
        return this.todoRepo.EditTodo(todo)
    }

    async MarkCompleteTodo(todo: any): Promise<Todo[]> {
        const todos = { id: todo.id, todo: todo.todo, complete: !todo.complete }
        return this.todoRepo.MarkCompleteTodo(todos)
    }

    async GetDays(todo: any): Promise<Todo[]> {
        const todos_f = [{}]
        todo.map((to: any) => {
            if (to) {
                const date_now = new Date()
                const today_date = date_now.getFullYear() + "-" + (date_now.getMonth() + 1) + "-" + date_now.getDate()
                const date_now_val = new Date(today_date)
                const date_from = new Date(to.dateCreated)
                const diffInMs = Math.abs(date_now_val.valueOf() - date_from.valueOf())
                const fnal = diffInMs / (1000 * 60 * 60 * 24)
                todos_f.push({
                    id: to.id,
                    todo: to.todo,
                    complete: to.complete,
                    dateCreated: todo.dateCreated,
                    days: fnal,
                })
            }
        })

        return this.todoRepo.GetDays(todos_f)
    }
}
