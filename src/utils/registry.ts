import React from "react";
import Introduction from "../components/Introduction";
import FlipCard from "../components/FlipCard";

const registry: Record<string, ({ data }: { data: any }) =>React.JSX.Element> = {};

registry["머리말"] = Introduction;
registry["카드"] = FlipCard;

export default registry;