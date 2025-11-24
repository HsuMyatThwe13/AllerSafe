import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shield, User, Lock, Mail, UserCircle } from 'lucide-react';
import { useDataContext } from '../context/DataContext';
import type { StoredUser } from '../types/user';

interface AuthPageProps {
  onLogin: (userId: string) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const { users, setUsers } = useDataContext();
  const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    setAuthError(null);
  }, [selectedRole]);

  const normalizeEmail = (value: string) => value.trim().toLowerCase();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setAuthError('Please select a role to continue.');
      return;
    }

    const existingUser = users.find(
      (user) => normalizeEmail(user.email) === normalizeEmail(loginEmail) && user.role === selectedRole,
    );

    if (!existingUser || existingUser.password !== loginPassword) {
      setAuthError('Invalid email or password.');
      return;
    }

    setAuthError(null);
    onLogin(existingUser.id);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      setAuthError('Please select a role to continue.');
      return;
    }

    const emailExists = users.some(
      (user) => normalizeEmail(user.email) === normalizeEmail(signupEmail),
    );

    if (emailExists) {
      setAuthError('An account with this email already exists.');
      return;
    }

    const newUser: StoredUser = {
      id: `user-${Date.now()}`,
      name: signupName.trim(),
      email: signupEmail.trim(),
      password: signupPassword,
      role: selectedRole,
      phone: '',
    };

    setUsers((prev) => [newUser, ...prev]);
    setAuthError(null);
    onLogin(newUser.id);
  };

  // Role selection screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-emerald-700 mb-2">Welcome to AllerSafe</h1>
              <p className="text-gray-600">
                Your personal meal safety guardian. Choose your role to continue.
              </p>
            </div>

            <Card className="p-8">
              <h2 className="text-emerald-700 mb-6 text-center">Select Account Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Regular User */}
                <button
                  onClick={() => setSelectedRole('user')}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group text-left"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                      <User className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-emerald-700 mb-2">Regular User</h3>
                      <p className="text-sm text-gray-600">
                        Create allergy profile, search meals, save favorites, and rate dishes
                      </p>
                    </div>
                  </div>
                </button>

                {/* Admin */}
                <button
                  onClick={() => setSelectedRole('admin')}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                >
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-blue-700 mb-2">Administrator</h3>
                      <p className="text-sm text-gray-600">
                        Manage food database, meals, ingredients, and allergen information
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </Card>

            <div className="mt-6">
              <Card className="p-6">
                <h3 className="text-emerald-700 mb-3">Platform Features</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                    <span>Create personalized allergy profiles with severity levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                    <span>Real-time allergen warnings based on your profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                    <span>Rate and review meals for the community</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                    <span>Set dietary preferences beyond allergies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                    <span>Track meal history and recently viewed items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                    <span>Get ingredient substitution suggestions</span>
                  </li>
                </ul>
              </Card>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              AllerSafe helps you make informed decisions about your meals. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Login/Signup screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-emerald-700 mb-2">AllerSafe</h1>
          <p className="text-gray-600">
            Continue as <strong className="capitalize">{selectedRole}</strong>
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedRole(null)}
            className="mt-2 text-sm"
          >
            Change Role
          </Button>
        </div>

        <Card className="p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          {authError && (
            <p className="text-sm text-red-600 mt-4 text-center">{authError}</p>
          )}
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}