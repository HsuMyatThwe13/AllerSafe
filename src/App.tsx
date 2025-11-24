import { useEffect } from 'react';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthPage } from './components/AuthPage';
import { Footer } from './components/Footer';
import { Button } from './components/ui/button';
import { Shield, LogOut } from 'lucide-react';
import { usePersistentState } from './hooks/usePersistentState';
import { useDataContext } from './context/DataContext';

export default function App() {
  const { users } = useDataContext();
  const [currentUserId, setCurrentUserId] = usePersistentState<string | null>(
    'allersafe:currentUserId',
    null,
  );

  const currentUser = users.find((user) => user.id === currentUserId) ?? null;

  useEffect(() => {
    if (currentUserId && !currentUser) {
      setCurrentUserId(null);
    }
  }, [currentUserId, currentUser, setCurrentUserId]);

  const handleLogin = (userId: string) => {
    setCurrentUserId(userId);
  };

  const handleLogout = () => {
    setCurrentUserId(null);
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-emerald-700">AllerSafe</h1>
                <p className="text-sm text-gray-500">Your Meal Safety Guardian</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role} Account</p>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentUser.role === 'user' ? (
          <UserDashboard
            key={currentUser.id}
            userId={currentUser.id}
            userName={currentUser.name}
            userEmail={currentUser.email}
          />
        ) : (
          <AdminDashboard />
        )}
      </main>

      <Footer />
    </div>
  );
}