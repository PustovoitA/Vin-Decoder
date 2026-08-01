import styles from "./Recent.module.css"

const Recent = () => {
    const testList = ["1FTFW1CT5DFC10312", "JN1AZ4EH7DM430111", "WDDGF3BB4DF968608"]
    // const testList: string[] | [] = [];


    return (<>
        <div>
            <p>Recent</p>
            <div className={styles.list}>
               {
                testList.length
                ? testList.slice(0,3).map(el => <span className={styles.list_item} key={el}>{el}</span>)
                :<span className={styles.secondary_text}>There aren't any recent ones yet.</span>
               }
            </div>
        </div>
    </>)
}
export default Recent