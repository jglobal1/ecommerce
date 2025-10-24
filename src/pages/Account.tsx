import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';
import { Building, User } from 'lucide-react';

export default function Account() {
  const { userType, setUserType } = useStore();

  const handleSetUserType = (type: 'individual' | 'government') => {
    setUserType(type);
    toast.success('Account type updated', {
      description: `Your account is now set to ${type} pricing.`,
    });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Account Type</h2>
          <p className="text-muted-foreground mb-6">
            Select your account type to see appropriate pricing throughout the store.
            Government accounts receive special institutional pricing.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => handleSetUserType('individual')}
              className={`p-6 border-2 rounded-lg text-left transition-all hover:border-primary ${
                userType === 'individual' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border'
              }`}
            >
              <User className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-bold mb-2">Individual Account</h3>
              <p className="text-sm text-muted-foreground">
                Standard retail pricing for individual customers and small businesses
              </p>
              {userType === 'individual' && (
                <p className="text-sm font-medium text-primary mt-3">✓ Currently selected</p>
              )}
            </button>

            <button
              onClick={() => handleSetUserType('government')}
              className={`p-6 border-2 rounded-lg text-left transition-all hover:border-primary ${
                userType === 'government' 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border'
              }`}
            >
              <Building className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-bold mb-2">Government Account</h3>
              <p className="text-sm text-muted-foreground">
                Special institutional pricing for government organizations and public sector
              </p>
              {userType === 'government' && (
                <p className="text-sm font-medium text-primary mt-3">✓ Currently selected</p>
              )}
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Current Benefits</h2>
          {userType === 'government' ? (
            <ul className="space-y-2 text-sm">
              <li>✓ Save up to 20% on all products</li>
              <li>✓ Priority customer support</li>
              <li>✓ Bulk order discounts</li>
              <li>✓ Dedicated account manager</li>
              <li>✓ Extended payment terms available</li>
            </ul>
          ) : (
            <ul className="space-y-2 text-sm">
              <li>✓ Competitive retail pricing</li>
              <li>✓ Fast shipping</li>
              <li>✓ 30-day returns</li>
              <li>✓ Secure checkout</li>
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
