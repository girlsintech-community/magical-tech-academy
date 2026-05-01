import { createFileRoute } from "@tanstack/react-router";
import { HogwartsLanding } from "@/components/HogwartsLanding";

export const Route = createFileRoute("/")({
  component: HogwartsLanding,
});
