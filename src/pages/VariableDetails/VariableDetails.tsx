import styles from "./VariableDetails.module.css"

import { useParams } from "react-router-dom"
import { useVariablesList } from "../../hooks/useVariablesList";

const VariableDetails = () => {
    const { variableId } = useParams<{variableId: string}>();
    const { data } = useVariablesList();
    const variable = data?.Results.find(el => el.ID === Number(variableId))
    
    return(<>
        <ul>
            <li>{variable?.Name}</li>
            <li>{variable?.ID}</li>
        </ul>
    </>)
}
export default VariableDetails