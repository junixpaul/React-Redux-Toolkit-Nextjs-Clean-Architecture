import { User } from "../entities/User"

export interface UserRepository {
    GetUser(): Promise<User[]>
}
