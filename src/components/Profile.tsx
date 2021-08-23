import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';

import styels from '../styles/components/Profile.module.css';
 
export function Profile(){
    const {level} = useContext(ChallengesContext);

    return(
        <div className={styels.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/66528896?v=4" alt="Ramiro Nzau" />
            <div>
                <strong>Ramiro Nzau</strong>
                <p>
                    <img src="icons/level.svg" alt="levelup" />
                    level {level}
                </p>
            </div>
        </div>
    )
}