export enum Roles {
    admin = 'admin',
    host = 'hostUser',
    user = 'user',
}

export type User = {
    id: string;
    email: string
    username: string;
    role: Roles[]
    hostId?: string
}