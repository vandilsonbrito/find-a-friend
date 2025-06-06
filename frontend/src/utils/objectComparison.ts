export function getChangedFields<T extends Record<string, any>>(
  original: T,
  modified: T,
  excludeFields: string[] = [],
): Partial<T> {
  const changes: Partial<T> = {}

  for (const key in modified) {
    if (excludeFields.includes(key)) continue

    const originalValue = original[key]
    const modifiedValue = modified[key]

    // photos
    if (Array.isArray(originalValue) && Array.isArray(modifiedValue)) {
      if (JSON.stringify(originalValue) !== JSON.stringify(modifiedValue)) {
        changes[key] = modifiedValue
      }
    } else if (originalValue !== modifiedValue) {
      changes[key] = modifiedValue
    }
  }

  return changes
}
