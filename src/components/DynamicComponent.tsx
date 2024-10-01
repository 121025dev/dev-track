import { Content } from "../api/Data";
import { getComponent } from "../utils/dsl";

function DynamicComponent({ dsl }: { dsl: Content }) {
  return getComponent(dsl);
}

export default DynamicComponent;