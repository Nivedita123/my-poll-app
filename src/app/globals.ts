import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable()

/**
 * This class contains variables which need to be shared by and modified from different components
 */
export class Globals {

    /**
     * The user logged in currently
     */
    currentUser$: User;
    
}