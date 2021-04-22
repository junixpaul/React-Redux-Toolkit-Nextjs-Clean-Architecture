import { User } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"

export class UserServiceImpl {
    userRepo: UserRepository

    constructor(ur: UserRepository) {
        this.userRepo = ur
    }

    async GetUser(): Promise<User[]> {
        return this.userRepo.GetUser()
    }
}
