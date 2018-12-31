import { Option } from './option.model';
import { User } from './user.model';
import { DocumentReference } from '@angular/fire/firestore';

/**
 * Data Model for  Polls
 * 
 * @property id
 * @property desc
 * @property options
 * @property time
 */
export interface Poll {

    id : string,
    desc: string,
    options : Option[],
    user: User,
    time: Date
}
