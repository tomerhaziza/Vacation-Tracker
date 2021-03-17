import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";

export function reduce(oldAppState: AppState, action: Action): AppState {
    const newAppState = { ...oldAppState };

    switch (action.type) {
        case ActionType.VacationToEdit:
            newAppState.vacationToEdit = action.payload;
            break;

        case ActionType.GetFollowedVacations:
            newAppState.followedVacationsArray = action.payload;
            break;

        case ActionType.GetNotFollowedVacations:
            newAppState.notFollowedVacationsArray = action.payload;
            break;

        case ActionType.UpdateUserType: //test
            newAppState.userType = action.payload;
            break;
    }

    return newAppState;
}