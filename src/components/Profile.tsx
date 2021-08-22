import styels from '../styles/components/Profile.module.css';
 
export function Profile(){
    return(
        <div className={styels.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/66528896?v=4" alt="Ramiro Nzau" />
            <div>
                <strong>Ramiro Nzau</strong>
                <p>
                    <img src="icons/level.svg" alt="levelup" />
                    level 1
                </p>
            </div>
        </div>
    )
}