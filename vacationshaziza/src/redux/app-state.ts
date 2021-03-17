import { Vacation } from '../models/Vacation';

export class AppState {
    public vacationToEdit: Vacation
    public followedVacationsArray: Vacation[]
    public notFollowedVacationsArray: Vacation[]
    public userType: string //test
}