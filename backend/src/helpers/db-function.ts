/**
 * generic function to handle string value enums
 * sample can be found in: src/constants/enums.ts
 * 
 * @param enumVal 
 * 
 * @returns string value of enum
 */
export function randomizeFetchEnumValue<T extends Record<string, string>>(
  enumVal: T
): T[keyof T] {
  const values = Object.values(enumVal);
  return values[Math.floor(Math.random() * values.length)] as T[keyof T];
}