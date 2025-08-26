import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// ★ ここから下を追記 ★
/**
 * Dev Loadの文字列を数値に変換します。
 * @param devLoad "XS", "S", "M", "L", "XL", "XXL" のいずれか
 * @returns 対応する数値
 */
export function getDevLoadValue(devLoad: string): number {
  switch (devLoad) {
    case "XS": return 1;
    case "S": return 3;
    case "M": return 5;
    case "L": return 8;
    case "XL": return 13;
    case "XXL": return 100;
    default: return 0; // 不明な値の場合は0を返す
  }
}
