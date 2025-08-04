import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Brain, Target, Zap, BarChart3 } from "lucide-react";

export const ModelMetrics = () => {
  const modelPerformance = [
    { metric: "Accuracy", value: 98.7, target: 95, status: "excellent" },
    { metric: "Precision", value: 96.2, target: 90, status: "excellent" },
    { metric: "Recall", value: 94.8, target: 85, status: "excellent" },
    { metric: "F1-Score", value: 95.5, target: 88, status: "excellent" },
    { metric: "False Positive Rate", value: 2.1, target: 5, status: "good", inverse: true },
    { metric: "Processing Speed", value: 87.3, target: 80, status: "good", unit: "ms" }
  ];

  const modelVersions = [
    { version: "v3.2.1", status: "production", accuracy: 98.7, deployedAt: "2024-01-15" },
    { version: "v3.2.0", status: "staging", accuracy: 98.9, deployedAt: "2024-01-10" },
    { version: "v3.1.5", status: "archived", accuracy: 97.2, deployedAt: "2023-12-20" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-accent text-accent-foreground";
      case "good": return "bg-primary text-primary-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case "production": return "bg-accent text-accent-foreground";
      case "staging": return "bg-warning text-warning-foreground";
      case "archived": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Model Performance Metrics */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Model Performance
          </CardTitle>
          <CardDescription>
            Real-time ML model performance metrics and accuracy scores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {modelPerformance.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{metric.metric}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">
                    {metric.value}%{metric.unit && ` ${metric.unit}`}
                  </span>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
              </div>
              <Progress value={metric.inverse ? 100 - metric.value : metric.value} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Target: {metric.target}%</span>
                <span>
                  {metric.inverse 
                    ? metric.value < metric.target ? "✓ Below target" : "⚠ Above target"
                    : metric.value > metric.target ? "✓ Above target" : "⚠ Below target"
                  }
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Model Versions */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Model Versions
          </CardTitle>
          <CardDescription>
            Deployed model versions and their performance history
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {modelVersions.map((version, index) => (
            <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{version.version}</p>
                    <p className="text-xs text-muted-foreground">
                      Deployed: {version.deployedAt}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getModelStatusColor(version.status)}>
                    {version.status}
                  </Badge>
                  <p className="text-sm font-medium mt-1">
                    {version.accuracy}% accuracy
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Training Metrics */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Training Progress
          </CardTitle>
          <CardDescription>
            Current model training and retraining metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Current Training Epoch</span>
              <span className="text-sm font-medium">847/1000</span>
            </div>
            <Progress value={84.7} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Data Quality Score</span>
              <span className="text-sm font-medium">96.3%</span>
            </div>
            <Progress value={96.3} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Feature Engineering</span>
              <span className="text-sm font-medium">Complete</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-primary">2.3M</p>
              <p className="text-xs text-muted-foreground">Training Samples</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <p className="text-lg font-bold text-secondary">156</p>
              <p className="text-xs text-muted-foreground">Features</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Monitoring */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Real-time Monitoring
          </CardTitle>
          <CardDescription>
            Live system performance and processing metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
              <p className="text-lg font-bold text-primary">1,247</p>
              <p className="text-xs text-muted-foreground">Transactions/min</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg">
              <p className="text-lg font-bold text-accent">23ms</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">CPU Usage</span>
              <span className="text-sm font-medium">67%</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Memory Usage</span>
              <span className="text-sm font-medium">54%</span>
            </div>
            <Progress value={54} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">API Throughput</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};