import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, TrendingUp, CheckCircle, XCircle, Clock } from "lucide-react";
import { TransactionMonitor } from "./TransactionMonitor";
import { ModelMetrics } from "./ModelMetrics";
import { RiskAnalysis } from "./RiskAnalysis";
import { ComplianceReport } from "./ComplianceReport";

export const FraudDashboard = () => {
  const alertStats = [
    { label: "High Risk", value: 23, color: "destructive", icon: AlertTriangle },
    { label: "Medium Risk", value: 67, color: "warning", icon: Clock },
    { label: "Verified Safe", value: 1256, color: "accent", icon: CheckCircle },
    { label: "Model Accuracy", value: 98.7, color: "primary", icon: Shield, suffix: "%" }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Fraud Detection System
            </h1>
            <p className="text-muted-foreground mt-2">
              Advanced ML-powered credit card fraud detection and prevention
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="bg-gradient-to-r from-accent to-secondary text-accent-foreground">
              Real-time Monitoring Active
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alertStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-elegant hover:shadow-glow transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${
                    stat.color === 'destructive' ? 'text-destructive' :
                    stat.color === 'warning' ? 'text-warning' :
                    stat.color === 'accent' ? 'text-accent' :
                    'text-primary'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.value}{stat.suffix || ''}
                  </div>
                  <Progress 
                    value={stat.color === 'destructive' ? 85 : stat.color === 'warning' ? 65 : 95} 
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="monitor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="monitor">Live Monitor</TabsTrigger>
            <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
            <TabsTrigger value="analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="monitor">
            <TransactionMonitor />
          </TabsContent>

          <TabsContent value="metrics">
            <ModelMetrics />
          </TabsContent>

          <TabsContent value="analysis">
            <RiskAnalysis />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};