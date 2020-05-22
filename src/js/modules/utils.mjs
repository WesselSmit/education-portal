export function exists([...variables]) {
    const exists = variables.every(variable => variable != null)
    return exists
}