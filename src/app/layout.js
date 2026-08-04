export const metadata = {
  title: 'Minimal portfolio',
  description: 'The Most Fantastic and Flawless Portfolio in the World',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
