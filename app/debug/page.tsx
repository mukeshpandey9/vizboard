"use client";

import { useEffect, useState } from "react";

export default function DebugPage() {
  const [info, setInfo] = useState({
    userAgent: "",
    platform: "",
    screenWidth: 0,
    screenHeight: 0,
    windowWidth: 0,
    windowHeight: 0,
    devicePixelRatio: 0,
    convexUrl: "",
    clerkPublishableKey: "",
    liveblocksPublicKey: "",
  });

  useEffect(() => {
    setInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL || "NOT SET",
      clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        ? "SET"
        : "NOT SET",
      liveblocksPublicKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY
        ? "SET"
        : "NOT SET",
    });
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Debug Information</h1>

      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Device Information</h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium text-gray-700">User Agent:</dt>
              <dd className="text-sm text-gray-600 break-all">
                {info.userAgent}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Platform:</dt>
              <dd className="text-sm text-gray-600">{info.platform}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Screen Size:</dt>
              <dd className="text-sm text-gray-600">
                {info.screenWidth} x {info.screenHeight}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Window Size:</dt>
              <dd className="text-sm text-gray-600">
                {info.windowWidth} x {info.windowHeight}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">
                Device Pixel Ratio:
              </dt>
              <dd className="text-sm text-gray-600">
                {info.devicePixelRatio}
              </dd>
            </div>
          </dl>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Environment Variables
          </h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium text-gray-700">Convex URL:</dt>
              <dd className="text-sm text-gray-600 break-all">
                {info.convexUrl}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">
                Clerk Publishable Key:
              </dt>
              <dd className="text-sm text-gray-600">
                {info.clerkPublishableKey}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">
                Liveblocks Public Key:
              </dt>
              <dd className="text-sm text-gray-600">
                {info.liveblocksPublicKey}
              </dd>
            </div>
          </dl>
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Browser Support</h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium text-gray-700">
                Local Storage Available:
              </dt>
              <dd className="text-sm text-gray-600">
                {typeof window !== "undefined" && window.localStorage
                  ? "✅ Yes"
                  : "❌ No"}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">
                WebSocket Available:
              </dt>
              <dd className="text-sm text-gray-600">
                {typeof WebSocket !== "undefined" ? "✅ Yes" : "❌ No"}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-700">Touch Support:</dt>
              <dd className="text-sm text-gray-600">
                {typeof window !== "undefined" && "ontouchstart" in window
                  ? "✅ Yes"
                  : "❌ No"}
              </dd>
            </div>
          </dl>
        </section>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Share this page with your friend and have them
            send you a screenshot. This will help identify any missing
            environment variables or browser compatibility issues.
          </p>
        </div>
      </div>
    </div>
  );
}
