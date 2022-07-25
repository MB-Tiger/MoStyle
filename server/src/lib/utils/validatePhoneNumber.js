

export default function validatePhoneNumber(value) {

  if (value.length > 13) throw new Error("Provided value is not a valid Phone Number")

  const re = /^(\+98|0|0098)?9\d{9}$/;

  const isValid = re.test(String(value));

  if (isValid) return `+98${value.slice(value.length - 10, value.length)}`;
  
  throw new Error("Provided value is not a valid Phone Number");
}