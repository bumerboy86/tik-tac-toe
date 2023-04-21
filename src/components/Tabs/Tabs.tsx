import styles from './Tabs.module.css';
import { ITabs } from '../../interfaces/ITabs';

export const Tabs = (props: ITabs) => {
    return (
      <div onClick={() => props.fn()} className={!props.data.trim().length ? styles.tab : `${styles.tabActive} ${styles.tab}`}>{props.data}</div>
    )
}