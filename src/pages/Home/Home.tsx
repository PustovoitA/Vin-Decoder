import Form from "../../components/Form/Form"
import Recent from "../../components/Recent/Recent"
import styles from "./Home.module.css"

const Home = () => {
    return (<>
        <section className={styles.section_home}>
            <h1 className={styles.head}>VIN decoder</h1>
            <Form/>
            <Recent/>
        </section>
    </>)
}

export default Home