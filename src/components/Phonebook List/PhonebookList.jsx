import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { selectFilteredContacts } from "../../redux/contacts/contacts-selectors";
import {fetchContacts, removeContact } from "../../redux/contacts/contacts-operations";

import styles from "./phonebook-list.module.css"

const PhonebookList = () => {
    const { items, isLoading, error } = useSelector(selectFilteredContacts);

     const dispatch = useDispatch();

     useEffect(() => {
    dispatch(fetchContacts());
     }, [dispatch]);

    const onRemoveContact = (id) => {
        dispatch(removeContact((id)));
    };

    const elements = items.map (({id, name, number}) => <li key={id}>{name} {number} <button onClick={() => onRemoveContact(id)} type="button">Remove contact</button></li>);


    return (
        <div className={styles.wrapper}>
        {isLoading && <p>Now Loading...</p>}
        {error && <p>{error}</p>}
        {Boolean(items.length) && <ol className={styles.list}>{elements}</ol>}
        </div>
        
    )

};

export default PhonebookList;