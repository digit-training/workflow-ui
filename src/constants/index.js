import { State } from "./state";
import {Action } from "./action";
import { Role } from "./role";
import {action} from "../constants/demoConfigs/action"
import {state} from "../constants/demoConfigs/state"
import {role} from "../constants/demoConfigs/roles"

export const ItemTypes = {
    State:"State",
    Action:"Action",
    Role:"Role",
    Status:"Status"
}
export const ItemData = {
    "State" : State,
    "Action": Action,
    "Role"  : Role,
    "Status": ""
}

export const TypeConfigMap = {
    State  : state,
    Action : action,
    Role   : role
}