import { useNavigate } from "react-router-dom"
import styles from "./Header.module.css"

const Header = () => {
    const navigation = useNavigate();

    return (<>
        <header className={styles.header}>
            <nav className={styles.nav}>
                <li onClick={()=>{navigation("/Home")}}>Home</li>
                <li onClick={()=>{navigation("/Variables")}}>Variables</li>
            </nav>
        </header>
    </>)
}
export default Header