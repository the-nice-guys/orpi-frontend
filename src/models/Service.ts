export class Service {
    id: number | undefined = 0
    name: string | undefined = ''
    description: string | undefined = ''
    host: string | undefined = undefined

    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.host = '';
    }
}
