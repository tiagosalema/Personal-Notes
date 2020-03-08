const telephoneCheck = str => {
  let regex=/(^(1\s)?\d{3}[\s-]\d{3}[\s-]\d{4}$)|(^(1\s?)?\(\d{3}\)\s?\d{3}-\d{4}$)|^\d{10}$/;
  return regex.test(str);
}

telephoneCheck("555-555-5555");