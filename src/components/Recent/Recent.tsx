import RecentSelectStore from "../../Store/RecentSelectStore"
import RecentStore from "../../Store/RecentStore";
import styles from "./Recent.module.css"

const Recent = () => {
    // 1FTFW1CT5DFC10312
    // JN1AZ4EH7DM430111
    // WDDGF3BB4DF968608
    // WVGEK9BP3CD010788
    // 2HGFC2F59JH542891
    // Vin for testing
    const recentList = RecentStore((state) => state.recent);
    const setSelectedValue = RecentSelectStore((state) => state.setSelectedValue);


    return (<>
        <div>
            <p>Recent</p>
            <div className={styles.list}>
               {
                recentList.length
                ? recentList.map(el => <span onClick={() => setSelectedValue(el)} className={styles.list_item} key={el}>{el}</span>)
                :<span className={styles.secondary_text}>There aren't any recent ones yet.</span>
               }
            </div>
        </div>
    </>)
}
export default Recent