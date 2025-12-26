/**
 * Utility function to merge class names (cn function)
 * Useful for combining Tailwind classes conditionally
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

