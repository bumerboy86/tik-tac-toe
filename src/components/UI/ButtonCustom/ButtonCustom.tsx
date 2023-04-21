import { EButton } from '../../../enums/EButton';
import { IButton } from '../../../interfaces/IButton';
import styles from './ButtonCustom.module.css';

export const ButtonCustom = (props: IButton) => {
    return (
    <button className={props.type === EButton.clear ? `${styles.clear} ${styles.btn}`: styles.btn} onClick={() => props.fn()}>{props.name}</button>
  )
}