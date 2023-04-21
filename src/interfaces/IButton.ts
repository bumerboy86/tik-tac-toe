import { EButton } from "../enums/EButton";

export interface IButton {
    name: string,
    fn: Function,
    type: EButton,
}