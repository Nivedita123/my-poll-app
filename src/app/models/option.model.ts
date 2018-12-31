import { User } from './user.model';

export interface Option {

    id: string,
    desc: string,
    voters: User[]
}
