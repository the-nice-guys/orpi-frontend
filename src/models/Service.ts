import {Option} from "@/models/Option";

export class Service {
    id: number | undefined = 0
    name: string = ''
    description: string = ''
    ip: string | undefined = ''
    host: string | undefined
    options: Array<Option> = []
    dependencies: Array<string> = []

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.host = '';
    }
}
