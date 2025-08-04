import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertTriangle, FileText, Shield, Download, Calendar } from "lucide-react";

export const ComplianceReport = () => {
  const complianceMetrics = [
    { 
      standard: "PCI DSS", 
      status: "compliant", 
      score: 98, 
      lastAudit: "2024-01-15", 
      nextAudit: "2024-07-15",
      requirements: 12,
      met: 12
    },
    { 
      standard: "SOX", 
      status: "compliant", 
      score: 96, 
      lastAudit: "2024-01-10", 
      nextAudit: "2024-04-10",
      requirements: 8,
      met: 8
    },
    { 
      standard: "GDPR", 
      status: "compliant", 
      score: 94, 
      lastAudit: "2024-01-05", 
      nextAudit: "2024-06-05",
      requirements: 15,
      met: 14
    },
    { 
      standard: "CCPA", 
      status: "warning", 
      score: 87, 
      lastAudit: "2023-12-20", 
      nextAudit: "2024-03-20",
      requirements: 10,
      met: 9
    }
  ];

  const auditFindings = [
    {
      id: "AUD-001",
      severity: "low",
      category: "Data Retention",
      description: "Transaction logs older than 7 years should be archived",
      status: "resolved",
      dueDate: "2024-02-15"
    },
    {
      id: "AUD-002",
      severity: "medium",
      category: "Access Control",
      description: "Admin access requires additional MFA verification",
      status: "in-progress",
      dueDate: "2024-02-28"
    },
    {
      id: "AUD-003",
      severity: "high",
      category: "Encryption",
      description: "Update encryption standards to AES-256",
      status: "pending",
      dueDate: "2024-03-15"
    }
  ];

  const reportingMetrics = [
    { metric: "Fraud Reports Generated", value: 156, period: "This Month" },
    { metric: "Regulatory Submissions", value: 23, period: "This Quarter" },
    { metric: "Audit Responses", value: 8, period: "Pending" },
    { metric: "Compliance Score", value: 94.2, period: "Overall", suffix: "%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-accent text-accent-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "non-compliant": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="h-4 w-4 text-accent" />;
      case "in-progress": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "pending": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportingMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{metric.value}{metric.suffix || ''}</p>
                  <p className="text-sm text-muted-foreground">{metric.metric}</p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.period}</p>
                </div>
                <FileText className="h-8 w-8 text-primary opacity-60" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Standards */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Compliance Standards
            </CardTitle>
            <CardDescription>
              Current compliance status across regulatory frameworks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {complianceMetrics.map((standard, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{standard.standard}</h4>
                      <Badge className={getStatusColor(standard.status)}>
                        {standard.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {standard.met}/{standard.requirements} requirements met
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{standard.score}%</p>
                    <p className="text-xs text-muted-foreground">compliance</p>
                  </div>
                </div>
                <Progress value={standard.score} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Last audit: {standard.lastAudit}</span>
                  <span>Next audit: {standard.nextAudit}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Audit Findings */}
        <Card className="border-0 shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Audit Findings
            </CardTitle>
            <CardDescription>
              Current audit findings and remediation status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {auditFindings.map((finding, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {finding.id}
                      </Badge>
                      <span className={`text-xs font-medium ${getSeverityColor(finding.severity)}`}>
                        {finding.severity.toUpperCase()}
                      </span>
                    </div>
                    <h4 className="font-medium mt-1">{finding.category}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {finding.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Due: {finding.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(finding.status)}
                    <Badge variant="outline" className="text-xs">
                      {finding.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Reporting & Documentation */}
      <Card className="border-0 shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Reporting & Documentation
          </CardTitle>
          <CardDescription>
            Generate compliance reports and audit documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              PCI DSS Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              SOX Documentation
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              GDPR Assessment
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Fraud Statistics
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Audit Trail
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Generate Full Report
            </Button>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">Automated Reporting Schedule</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Daily Reports:</p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Fraud detection summary</li>
                  <li>Transaction volume analysis</li>
                  <li>Risk score distribution</li>
                </ul>
              </div>
              <div>
                <p className="text-muted-foreground">Monthly Reports:</p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Compliance status update</li>
                  <li>Model performance review</li>
                  <li>Regulatory submissions</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};