import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    Response,
    SuccessResponse,
    Example
} from "tsoa";
import { injectable } from 'tsyringe';

// import { UUID } from 'lib/types/core'; // Doesn't work if using path defined in tsconfig
import { UUID } from '../lib/types/core';
import { User } from "./user";
import { UsersService, UserCreationParams } from "./usersService";

export interface ValidateErrorJSON {
    message: "Validation failed";
    details?: { [name: string]: unknown };
}

@injectable()
@Route("users")
export class UsersController extends Controller {
    constructor(private usersService: UsersService) {
        super();
    }

    /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
    @Example<User>({
        id: "52907745-7672-470e-a803-a2f8feb52944",
        name: "tsoa user",
        email: "hello@tsoa.com",
        phoneNumbers: [],
        status: "Happy",
    })
    @Get("{userId}")
    public async getUser(
        @Path() userId: UUID,
        @Query() name?: string
    ): Promise<User> {
        return this.usersService.get(userId, name);
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed", {
        message: "Validation failed",
        details: {
            requestBody: {
                message: "id is an excess property and therefore not allowed",
                value: "52907745-7672-470e-a803-a2f8feb52944",
            },
        },
    })
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        this.usersService.create(requestBody);
        return;
    }
}
