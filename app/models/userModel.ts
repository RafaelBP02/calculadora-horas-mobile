import { CustomRole } from "./roleModel";

export interface CustomUser {
    id: number,
    eMail: string,
    name: string,
    surename: string,
    workplace: string,
    role: CustomRole
}