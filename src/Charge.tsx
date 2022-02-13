import { useState } from 'react';
import { ReactComponent as Icon } from './Icon.svg'
import { ReactComponent as Second } from './second.svg'
import styles from './Charge.module.css';

const Charge = () => {
    const [value, setValue] = useState(false);

    function toggle() {
        setValue(!value)
    }

    if (!value) {
        return (
            <div className={styles.container} onClick={() => toggle()}><img src="keba.png" /></div>
        )
    } else {
        return (
            <div className={styles.container} onClick={() => toggle()}><Second /></div>
        )
    }
}
  
export default Charge