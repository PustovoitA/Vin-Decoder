import DecodedResult from "../../components/DecodedResult/DecodedResult"
import Form from "../../components/Form/Form"
import Recent from "../../components/Recent/Recent"
import styles from "./Home.module.css"

const Home = () => {
    return (<>
        <section className={styles.section_home}>
            <h1 className={styles.head}>VIN decoder</h1>
            <Form/>
            <Recent/>
            <DecodedResult/>
        </section>
    </>)
}

export default Home