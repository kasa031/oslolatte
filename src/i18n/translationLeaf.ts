export type Dict = Record<string, unknown>;

export function leaf(strings: Record<string, string>): Dict {
  return strings as unknown as Dict;
}
