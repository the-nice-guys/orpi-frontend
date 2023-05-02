import {Service} from "./Service";

export class Host {
    host_id: number | undefined = 0
    name: string | undefined = ''
    description: string | undefined = ''
    icon: string | undefined = ''
    ip: string | undefined = ''
    status: number | undefined = 0
    services: Service[] = []
}
