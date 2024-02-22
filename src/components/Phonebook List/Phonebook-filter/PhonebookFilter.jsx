import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../../redux/filter/filter-slice";
import { selectFilter } from "../../../redux/filter/filter-selectors";

import styles from "./phonebook-filter.module.css"

const PhonebookFilter = () => {
    const dispatch = useDispatch();
    const filter = useSelector(selectFilter);

    const changeFilter = ({target}) => dispatch(setFilter(target.value));

    return (
        <input value={filter} className={styles.input} name="filter" placeholder="Search" onChange={changeFilter} />
    )
};

export default PhonebookFilter;
