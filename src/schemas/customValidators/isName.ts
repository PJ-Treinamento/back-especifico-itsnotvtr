const isName = (value: string) => {
    if (/\d/.test(value)) {
      throw new Error('Name cannot contain numbers');
    }
  
    if (value.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
  
    const regex = /^[\wÀ-ú'-]+$/;
    if (!regex.test(value)) {
      throw new Error('Invalid name format');
    }
  
    return true;
  };
  
  export default isName;
  