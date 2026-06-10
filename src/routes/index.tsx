import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arshad Ansari — Full-Stack Engineer" },
      {
        name: "description",
        content:
          "Full-stack engineer focused on architecture, performance, cloud systems, real-time communication, and AI integrations. Bareilly, India.",
      },
      { property: "og:title", content: "Arshad Ansari — Full-Stack Engineer" },
      {
        property: "og:description",
        content:
          "I build systems that hold up. Architecture, real-time, cloud, and AI integrations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
