import {Service} from "./Service";

export class Host {
    id: number | undefined = 0
    name: string | undefined = ''
    description: string | undefined = ''
    icon: string | undefined = ''
    ip: string | undefined = ''
    status: number | undefined = 0
    services: Service[] = []
}
