import {Host} from "./Host";

export class Infrastructure {
    infrastructure_id: number | undefined = 0
    name: string | undefined = ''
    description: string | undefined = ''
    icon: string | undefined = ''
    hosts: Host[] = []
}
