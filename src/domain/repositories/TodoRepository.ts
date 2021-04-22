import { Todo } from "../entities/Todo"

export interface TodoRepository {
    GetTodo(): any
    RemoveTodo(todo: any): any
    AddTodo(todo: any): any
    EditTodo(todo: any): any
    MarkCompleteTodo(todo: any): any
    GetDays(todo: any): any
}
