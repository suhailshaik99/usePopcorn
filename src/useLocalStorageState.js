import { useState, useEffect } from "react";
export function useLocalStorageState(key) {
    const [value, setValue] = useState(function () {
        const storedValue = localStorage.getItem(key);
        return JSON.parse(storedValue) || [];
      });

      useEffect(
        function () {
          localStorage.setItem("watched", JSON.stringify(value));
        },
        [value]
      );
      return [value, setValue];
}