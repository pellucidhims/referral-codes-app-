import { ReferralContent } from "@/types";

export function debounce<T extends (...args: never[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

export function searchByRegex(searchString: string, items: ReferralContent[] = [], objectSearchKey: keyof ReferralContent) {
    // Escape special characters in the search string
    const escapedSearchString = searchString.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    // Create a regex pattern to match characters in order
    const regexPattern = escapedSearchString.split("").join(".*");
    
    // Create a regex object with the case-insensitive flag
    const regex = new RegExp(regexPattern, "i");
    
    // Filter the items that match the regex
    return items?.filter(item => regex.test(item[objectSearchKey]));
  }