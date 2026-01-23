import React from "react"
import type { Metadata } from 'next'
import { Geist, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: 'Isla Borinken | Puerto Rico Adventure Tours',
  description: 'Unforgettable outdoor adventures in Puerto Rico guided by a local born and raised on the island.',

  icons: {
    icon: [{ url: "data:," }],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
