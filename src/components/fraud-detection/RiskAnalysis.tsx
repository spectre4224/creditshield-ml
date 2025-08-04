import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, TrendingUp, Globe, CreditCard, MapPin, Clock } from "lucide-react";

export const RiskAnalysis = () => {
  const riskFactors = [
    { factor: "Unusual Transaction Amount", weight: 85, impact: "high", description: "Transactions significantly above normal patterns" },
    { factor: "Geographic Anomaly", weight: 72, impact: "high", description: "Transactions from unusual locations" },
    { factor: "Velocity Patterns", weight: 68, impact: "medium", description: "Rapid successive transactions" },
    { factor: "Merchant Category Risk", weight: 56, impact: "medium", description: "High-risk merchant categories" },
    { factor: "Time-based Anomalies", weight: 43, impact: "low", description: "Transactions at unusual hours" },
    { factor: "Device Fingerprinting", weight: 39, impact: "low", description: "Unknown or suspicious devices" }
  ];

  const geographicRisks = [
    { region: "Eastern Europe", riskLevel: 89, incidents: 156, trend: "increasing" },
    { region: "Southeast Asia", riskLevel: 76, incidents: 203, trend: "stable" },
    { region: "West Africa", riskLevel: 71, incidents: 89, trend: "decreasing" },
    { region: "South America", riskLevel: 62, incidents: 134, trend: "stable" },
    { region: "Middle East", riskLevel: 58, incidents: 67, trend: "increasing" }
  ];

  const merchantRisks = [
    { category: "Online Gaming", riskScore: 87, volume: "High", chargebacks: 23.4 },
    { category: "Cryptocurrency", riskScore: 82, volume: "Medium", chargebacks: 19.8 },
    { category: "Adult Content", riskScore: 79, volume: "Low", chargebacks: 31.2 },
    { category: "Travel Services", riskScore: 65, volume: "High", chargebacks: 12.7 },
    { category: "Electronics", riskScore: 34, volume: "High", chargebacks: 5.3 }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return <TrendingUp className="h-3 w-3 text-destructive" />;
      case "decreasing": return <TrendingUp className="h-3 w-3 text-accent rotate-180" />;
      default: return <div className="h-3 w-3 rounded-full bg-warning" />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="factors" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="factors">Risk Factors</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Analysis</TabsTrigger>
          <TabsTrigger value="merchant">Merchant Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="factors" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Risk Factor Analysis
              </CardTitle>
              <CardDescription>
                Machine learning identified risk factors and their impact weights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {riskFactors.map((factor, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{factor.factor}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${getImpactColor(factor.impact)} border-current`}
                        >
                          {factor.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {factor.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{factor.weight}%</p>
                      <p className="text-xs text-muted-foreground">weight</p>
                    </div>
                  </div>
                  <Progress value={factor.weight} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-lg">
                  <p className="text-3xl font-bold text-destructive">23</p>
                  <p className="text-sm text-muted-foreground">High Risk Transactions</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg">
                  <p className="text-3xl font-bold text-warning">67</p>
                  <p className="text-sm text-muted-foreground">Medium Risk Transactions</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
                  <p className="text-3xl font-bold text-accent">1,256</p>
                  <p className="text-sm text-muted-foreground">Low Risk Transactions</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-elegant">
              <CardHeader>
                <CardTitle>Model Confidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">High Confidence</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Medium Confidence</span>
                    <span className="text-sm font-medium">4.8%</span>
                  </div>
                  <Progress value={4.8} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Low Confidence</span>
                    <span className="text-sm font-medium">1.0%</span>
                  </div>
                  <Progress value={1.0} className="h-2" />
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary">
                  Retrain Model
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Geographic Risk Analysis
              </CardTitle>
              <CardDescription>
                Risk assessment by geographic regions and fraud incident tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicRisks.map((region, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium">{region.region}</p>
                          <p className="text-sm text-muted-foreground">
                            {region.incidents} incidents reported
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getTrendIcon(region.trend)}
                        <div className="text-right">
                          <p className="font-bold text-lg">{region.riskLevel}%</p>
                          <p className="text-xs text-muted-foreground">risk level</p>
                        </div>
                      </div>
                    </div>
                    <Progress value={region.riskLevel} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchant" className="space-y-6">
          <Card className="border-0 shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Merchant Risk Categories
              </CardTitle>
              <CardDescription>
                Risk analysis by merchant category and chargeback rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {merchantRisks.map((merchant, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{merchant.category}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="outline">
                            Volume: {merchant.volume}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {merchant.chargebacks}% chargeback rate
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{merchant.riskScore}%</p>
                        <p className="text-xs text-muted-foreground">risk score</p>
                      </div>
                    </div>
                    <Progress value={merchant.riskScore} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};