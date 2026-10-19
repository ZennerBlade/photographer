/** Indian digit grouping: 120000 -> "₹1,20,000". Single source for all prices. */
const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
export const formatINR = (n: number): string => `₹${inr.format(n)}`;
export const formatRating = (r: number): string => r.toFixed(1);
export const plural = (n: number, one: string, many = one + 's'): string => `${n} ${n === 1 ? one : many}`;
