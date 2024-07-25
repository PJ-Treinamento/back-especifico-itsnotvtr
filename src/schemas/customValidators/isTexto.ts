const isTexto = (value: string): boolean => {

    if (!value.trim() || value.length > 140) {
        throw new Error('The text format is invalid');
    }
    return true; 
};

export default isTexto;
