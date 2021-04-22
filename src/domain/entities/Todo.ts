export class Todo {
    id: number
    todo: string
    complete: boolean
    dateCreated: string
    days: string

    constructor(id: number, todo: string, complete: boolean, dateCreated: string, days: string) {
        this.id = id
        this.todo = todo
        this.complete = complete
        this.dateCreated = dateCreated
        this.days = days
    }
}
