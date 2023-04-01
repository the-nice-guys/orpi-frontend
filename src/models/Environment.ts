import {Host} from "./Host";

export class Environment {
    id: number | undefined = 0
    name: string | undefined = ''
    description: string | undefined = ''
    icon: string | undefined = ''
    hosts: Host[] = []
}
