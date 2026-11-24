export function passwordErrors(password) {
  const errors = []
  if (password.length < 8 || password.length >= 15) {
    errors.push('Must contain 8 to 14 characters.')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Must include at least one uppercase letter.')
  }
  if ((password.match(/[a-z]/g) || []).length < 2) {
    errors.push('Must include at least two lowercase letters.')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Must include at least one numeric value.')
  }
  if (!/^[A-Z]/.test(password)) {
    errors.push('Must start with an uppercase letter.')
  }
  if (!password.includes('_')) {
    errors.push('Must include the character _.')
  }
  return errors
}
