import './globals.css'

export const metadata = {
  title: 'RDDB',
  description: 'Card Database Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}