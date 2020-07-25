export const requiredRule = value => (value == null ? 'Required' : undefined);

export const emailRule = value =>
    (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email'
        : undefined);

export const phoneNoRule = value =>
    (value && !/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/.test(value)
        ? 'Invalid Phone Number'
        : undefined);

export const zipCodeRule = value => (value && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)
    ? 'Invalid Zip Code'
    : undefined);