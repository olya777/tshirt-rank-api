// import { UUID } from 'lib/types/core'; // Doesn't work if using path defined in tsconfig
import { UUID } from '../lib/types/core';
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
} from "tsoa";
import { User } from "./user";
import { UsersService, UserCreationParams } from "./usersService";

export interface ValidateErrorJSON {
    message: "Validation failed";
    details?: { [name: string]: unknown };
}

@Route("users")
export class UsersController extends Controller {
    /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
    @Get("{userId}")
    public async getUser(
        @Path() userId: UUID,
        @Query() name?: string
    ): Promise<User> {
        return new UsersService().get(userId, name);
    }

    @Response<ValidateErrorJSON>(422, "Validation Failed")
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams
    ): Promise<void> {
        this.setStatus(201); // set return status 201
        new UsersService().create(requestBody);
        return;
    }
}
