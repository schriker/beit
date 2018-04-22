export const onChange = (state, event, elementId) => {
    const formData = {
        ...state.loginForm,
        [elementId]: {
            ...state.loginForm[elementId],
        }
    };

    if (event.target) {
        formData[elementId].value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    }

    formData[elementId].touched = true;
    formData[elementId].valid = checkValidity(formData[elementId].value, formData[elementId].type);

    return formData
}

export const checkValidity = (value, type) => {

    if (type === "email") {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return (
            pattern.test(value)
        )
    }

    if (type === "password") {
        return (
            value.length >= 6
        )
    }

    if (type === "text" || type === "adding") {
        return (
            value.length >= 2
        )
    }

    if (type === "select") {
        return (
            true
        )
    }

    if (type === "number") {
        return (
            value >= 1
        )
    }

    if (type === "checkbox") {
        return (
            value
        )
    }
}

export const setTouched = (state) => {
    let formData = {...state.loginForm};

    for (let key in state.loginForm) {
        formData = {
            ...formData,
            [key]: {
                ...state.loginForm[key],
                touched: true
            }
        }
    }
    return formData;
}