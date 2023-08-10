import { state } from "./state";
import {action } from "./action";
import { role } from "./role";

export const ItemTypes = {
    State:"state",
    Action:"action",
    Role:"role"
}
export const ItemData = {
    State : state,
    Action: action,
    Role  : role
}