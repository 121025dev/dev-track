import { Content } from "../api/Data";
import registry from "./registry";

export const getComponent = (dsl: Content) => {
  if(registry[dsl.type] === undefined) {
    return null;
  }
  const plugin = registry[dsl.type];
  return plugin(dsl);
}