export const selectAllContacts = store => store.contacts;

export const selectFilteredContacts = store => {
    const { contacts, filter } = store;
    const { items } = contacts;

    if (!filter) {
        return { ...contacts };
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = items.filter(({ name, number }) => {
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.toLowerCase();
        return normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
    });

    return { ...contacts, items: filteredContacts };
};
