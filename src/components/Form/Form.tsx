import { useForm, type SubmitHandler } from "react-hook-form"
import styles from "./From.module.css"
import RecentStore from "../../Store/RecentStore";
import { useEffect } from "react";

interface InputType {
    code: string
}

const VIN_REGEX = /^[A-HJ-NPR-Z0-9]{1,17}$/i;

const Form = () => {
    const {register, handleSubmit, formState: {errors}, setValue, watch, reset} = useForm<InputType>(
        {
            mode:"onChange",
            defaultValues:{code:""}
        }
    )
    const onSubmit:SubmitHandler<InputType> = (data) => {
        console.log(data);
        reset();
    }
    const code = watch("code")
    const selectedValue = RecentStore((state) => state.selectedValue);
    useEffect(()=>{
        setValue("code", selectedValue);
    }, [selectedValue]);

    return(<>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
            value={code}
            className={styles.input}
            placeholder="1FTFW1CT5DFC10312" 
            type="text"
            {...register("code", {
                required: "The field cannot be empty",
                maxLength: {
                    value: 17,
                    message: "Enter up to 17 characters, letters and digits only"
                },
                pattern: {
                    value: VIN_REGEX,
                    message: "Enter up to 17 characters, letters and digits only"
                }
            })} />
            <button className={styles.submit_button} type="submit">Decode</button>
            {errors.code?.message &&
            (<span className={styles.error_massage}>
                {errors.code.message}
            </span>)}
        </form>
    </>)
}

export default Form