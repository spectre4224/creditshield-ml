import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle, Clock, CreditCard, MapPin, User } from "lucide-react";
import { useState, useEffect } from "react";

interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  location: string;
  cardNumber: string;
  riskScore: number;
  status: 'approved' | 'flagged' | 'blocked';
  timestamp: Date;
  userId: string;
}

export const TransactionMonitor = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Simulate real-time transaction data
  useEffect(() => {
    const generateTransaction = (): Transaction => {
      const merchants = ["Amazon", "Walmart", "Target", "Best Buy", "Starbucks", "Shell", "McDonald's", "Apple Store"];
      const locations = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ"];
      const riskScore = Math.random() * 100;
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        amount: Math.floor(Math.random() * 5000) + 10,
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        cardNumber: `****-****-****-${Math.floor(Math.random() * 9000) + 1000}`,
        riskScore,
        status: riskScore > 80 ? 'blocked' : riskScore > 60 ? 'flagged' : 'approved',
        timestamp: new Date(),
        userId: `user_${Math.floor(Math.random() * 1000)}`
      };
    };

    // Initial transactions
    const initialTransactions = Array.from({ length: 10 }, generateTransaction);
    setTransactions(initialTransactions);

    // Add new transactions every 3 seconds
    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setTransactions(prev => [newTransaction, ...prev.slice(0, 19)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRiskBadge = (status: string, riskScore: number) => {
    switch (status) {
      case 'blocked':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          High Risk ({riskScore.toFixed(1)}%)
        </Badge>;
      case 'flagged':
        return <Badge className="bg-warning text-warning-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Medium Risk ({riskScore.toFixed(1)}%)
        </Badge>;
      default:
        return <Badge className="bg-accent text-accent-foreground flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Approved ({riskScore.toFixed(1)}%)
        </Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Live Transaction Feed */}
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Live Transaction Stream
            </CardTitle>
            <CardDescription>
              Real-time monitoring of credit card transactions with ML-based risk scoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <CreditCard className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">{transaction.merchant}</p>
                          </div>
                        </div>
                        {getRiskBadge(transaction.status, transaction.riskScore)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {transaction.cardNumber}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {transaction.location}
                        </div>
                        <div>
                          {transaction.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    {transaction.status === 'flagged' && (
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm" variant="destructive">Block</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Risk Summary */}
      <div className="space-y-6">
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">High Risk</span>
                <span className="text-sm font-medium text-destructive">23</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-destructive h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Medium Risk</span>
                <span className="text-sm font-medium text-warning">67</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Low Risk</span>
                <span className="text-sm font-medium text-accent">1256</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle>Alert Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline">
              Review Flagged Transactions
            </Button>
            <Button className="w-full" variant="outline">
              Export Risk Report
            </Button>
            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground">
              Generate Alert Summary
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};