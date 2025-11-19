"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, Unauthenticated, ConvexReactClient } from "convex/react";
import type { PropsWithChildren } from "react";

import { Loading } from "@/components/auth/loading";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

if (!convexUrl) {
  console.error("NEXT_PUBLIC_CONVEX_URL is not defined");
}

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>

        <Unauthenticated>
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Please sign in</h2>
              <p className="text-muted-foreground mb-6">You need to be authenticated to access this application</p>
              <a 
                href="/sign-in" 
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Sign In
              </a>
            </div>
          </div>
        </Unauthenticated>

        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
