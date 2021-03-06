import { singleton } from 'tsyringe';

import { UUID } from 'lib/types/core';
import { User } from "./user";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

@singleton()
export class UsersService {
    public get(id: UUID, name?: string): User {
        return {
            id,
            email: "jane@doe.com",
            name: name ?? "Jane Doe",
            status: "Happy",
            phoneNumbers: [],
        };
    }

    public create(userCreationParams: UserCreationParams): User {
        return {
            id: Math.floor(Math.random() * 10000).toString(), // Random
            status: "Happy",
            ...userCreationParams,
        };
    }
}