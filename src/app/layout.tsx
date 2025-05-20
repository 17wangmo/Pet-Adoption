import './globals.css';
import ClientLayout from './client-layout';

export const metadata = {
  title: 'Happy Tails - Pet Adoption',
  description: 'Find your perfect furry friend at Happy Tails Pet Adoption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
