// import
// 
//  type { Metadata } from 'next';
// import { AuthProvider } from './context/AuthContext';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Payments App',
//   description: 'Manage your payments easily',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {/* la seguridad y los toast envuelven la app */}
//         <AuthProvider>
//           {children}
//         </AuthProvider>
//         <ToastContainer
//           position="bottom-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { AuthProvider } from './context/AuthContext';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeRegistry from './ThemeRegistry'; // <-- Importar el nuevo proveedor

export const metadata: Metadata = {
  title: 'Payments App',
  description: 'Manage your payments easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry> {/* <-- Envolver la aplicación con el proveedor de tema */}
          <AuthProvider>{/* la seguridad y los toast envuelven la app */}
            {children}
          </AuthProvider>
        </ThemeRegistry>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
        />
      </body>
    </html>
  );
}