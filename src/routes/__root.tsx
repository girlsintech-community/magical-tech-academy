import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-7xl text-gold">404</h1>
        <p className="mt-3 text-foreground/80">This page is hidden in another castle.</p>
        <a href="/" className="mt-6 inline-block rounded-full bg-gold px-5 py-2 text-sm font-semibold text-[color:var(--primary-foreground)]">
          Return to hogwartz
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "hogwartz: A Magical Virtual Tech Summer School — Girls Leading Tech" },
      {
        name: "description",
        content:
          "A free 14-day virtual tech summer school for students 8–18 across India. Learn AI, design and creation. June 7–21, 2026. Only 200 seats.",
      },
      { name: "author", content: "Girls Leading Tech" },
      { property: "og:title", content: "hogwartz: A Magical Virtual Tech Summer School" },
      { property: "og:description", content: "A free 14-day magical tech summer school. June 7–21, 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster theme="dark" position="top-center" />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
