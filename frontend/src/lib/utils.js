import { clsx } from "clsx" // allows you to pass a mix of strings  with valid class names combined. helps us dynamically apply class names based on logic
import { twMerge } from "tailwind-merge" // built specifically to handle conflicts in tailwind css class names

export function cn(...inputs) {
  return twMerge(clsx(inputs)) // conditionally combine all the input classes into a single string and resolve any coonflicts between tailwind classes
}

// this help us resolve tailwind conflicts with class names, especialy when you need to conditionally render them