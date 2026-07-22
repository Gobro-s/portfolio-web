import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn 레지스트리(Cult UI·Skiper UI) 컴포넌트가 공통으로 기대하는 클래스 병합 유틸. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
