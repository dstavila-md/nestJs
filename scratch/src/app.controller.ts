import { Controller, Get } from "@nestjs/common"

@Controller('/app')
export class AppController {
    
    @Get('/hi')
    getRootRoute(){
        return 'Hello World!'
    }

    @Get('/bye')
    getByeThere(){
        return 'Goodbye!'
    }
}