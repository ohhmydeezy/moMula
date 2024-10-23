import { AuthState } from "../auth/auth.reducer";
import { UserState } from "./app.reducer";

export interface AppState {
    userState: UserState;
    authState: AuthState
}