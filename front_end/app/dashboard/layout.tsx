import Sidebar from '@/app/dashboard/components/sidebar';


export default function RootLayout({ children }) {
  return (
    
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="ml-64 flex-1 p-6">
            {children}
          </main>
        </div>
     
  );
}
