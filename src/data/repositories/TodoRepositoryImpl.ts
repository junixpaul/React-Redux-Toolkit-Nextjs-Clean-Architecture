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

    async GetTodo(): Promise<Todo[]> {
        return this.jsonUrl.map(
            (todo: TodoDTO) => new Todo(todo.id, todo.todo, todo.complete, todo.dateCreated, todo.days),
        )
    }

    async AddTodo(todo: any): Promise<Todo[]> {
        return this.jsonUrl.concat({
            todo: todo.todo,
            id: todo.id,
            complete: todo.complete,
            dateCreated: todo.dateCreated,
            days: todo.days,
        })
    }

    async RemoveTodo(todo: any): Promise<Todo[]> {
        return this.jsonUrl.filter((i) => i.id !== todo.id)
    }

    async EditTodo(todo: any): Promise<Todo[]> {
        const index = this.jsonUrl.findIndex((todos) => todos.id === todo.id),
            tod = [...this.jsonUrl]
        tod[index] = todo
        return tod
    }

    async MarkCompleteTodo(todo: any): Promise<Todo[]> {
        const index = this.jsonUrl.findIndex((todos) => todos.id === todo.id),
            tod = [...this.jsonUrl]
        tod[index] = todo
        return tod
    }

    async GetDays(todo: any): Promise<Todo[]> {
        return todo.filter((i: any) => i.id !== undefined)
    }
}
