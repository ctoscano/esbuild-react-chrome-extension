import { get } from "lodash";

export interface IPreferences {
  toLowerCase: boolean;
  [key: string]: any;
}

const defaultPreferences: IPreferences = {
  toLowerCase: true
};

let preferences = defaultPreferences;

export const setPreferences = (newPreferences: IPreferences) => {
  console.log("preferences", newPreferences);
  preferences = { ...preferences, ...newPreferences };
  console.log(
    "example library",
    get([1, { a: 1, b: 2 }, 3], "[1].b", 0 as number) === 2
  );
};

export const getPreferences = () => preferences; // NOTE: subset is not used
