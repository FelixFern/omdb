import { HomePageContent } from "@/components";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const homePageSearchSchema = z.object({
  q: z.string().optional(),
});
export const Route = createFileRoute("/")({
  component: App,
  validateSearch: homePageSearchSchema,
});

function App() {
  return <HomePageContent />;
}
