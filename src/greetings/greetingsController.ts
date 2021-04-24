import { Route, Controller, Get, Query, Res, TsoaResponse } from 'tsoa'

@Route('/greeting')
export class GreetingsController extends Controller {
    /**
     * @param notFoundResponse The responder function for a not found response
     */
    @Get('/')
    public async greet(@Query() name: string = '', @Res() notFoundResponse: TsoaResponse<404, { reason: string }>): Promise<string> {
        if (!name) {
            return notFoundResponse(404, { reason: "We don't know you yet. Please provide a name" });
        }

        return `Hello, ${name}`;
    }
}