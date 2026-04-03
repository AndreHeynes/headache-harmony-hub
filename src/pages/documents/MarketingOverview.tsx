import React from "react";
import { ArrowLeft, CheckCircle, TrendingUp, Users, Award } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketingOverview = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded-full hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold">Program Benefits & Marketing Overview</h1>
      </div>

      <Card className="mb-6 bg-muted">
        <CardHeader>
          <CardTitle className="text-2xl">Transform Your Headache Experience in Just 12 Weeks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Recover & Reclaim is not just another headache program — it's a comprehensive, 
            evidence-based journey designed to help you understand, manage, and reclaim control 
            over your life from primary headache disorders.
          </p>
          <div className="flex items-center text-green-700 font-medium">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span>Backed by 20+ years of clinical experience and peer-reviewed research</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-6 w-6 text-primary" />
            What Makes Us Different
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Evidence-Based & Validated</p>
                  <p className="text-sm text-muted-foreground">
                    Using clinically-validated assessment tools (HIT-6, MIDAS, PSFS) and 
                    research-proven interventions
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Truly Personalized</p>
                  <p className="text-sm text-muted-foreground">
                    Your program adapts based on your specific headache profile, functional 
                    goals, and psychological factors
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Comprehensive Approach</p>
                  <p className="text-sm text-muted-foreground">
                    Integrates physical therapy, cognitive-behavioral strategies, pain education, 
                    and lifestyle modifications
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Structured Yet Flexible</p>
                  <p className="text-sm text-muted-foreground">
                    Clear daily guidance with self-paced progression that fits your schedule 
                    (20-30 minutes/day)
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Long-Term Success Focus</p>
                  <p className="text-sm text-muted-foreground">
                    Phase 4 ensures you create a sustainable maintenance program for continued 
                    improvement beyond 12 weeks
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="mr-3 h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold">Measure Real Progress</p>
                  <p className="text-sm text-muted-foreground">
                    Track meaningful improvements in headache impact, disability, and your 
                    personal functional goals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-green-600" />
            Expected Outcomes & Success Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Based on research evidence supporting our program components, participants can expect:
          </p>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-green-900 mb-2">Headache Impact Reduction</p>
              <p className="text-sm">
                Clinically significant improvement in HIT-6 scores, indicating reduced impact on 
                daily life, work, and social activities
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">Decreased Disability</p>
              <p className="text-sm">
                35-50% reduction in headache-related disability (MIDAS scores), with improvements 
                in missed work/school days and productivity
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">Improved Function</p>
              <p className="text-sm">
                Achievement of patient-specific functional goals (PSFS), returning to activities 
                that matter most to you
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">Enhanced Self-Management</p>
              <p className="text-sm">
                Increased confidence and skills to independently manage headaches through 
                understanding triggers, effective exercises, and cognitive strategies
              </p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-semibold text-foreground mb-2">Sustained Improvements</p>
              <p className="text-sm">
                Research shows multi-modal approaches like ours maintain benefits long-term, 
                with your personalized Phase 4 maintenance program supporting ongoing success
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-6 w-6 text-primary" />
            Who Benefits Most
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">This program is ideal for individuals who:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Have been diagnosed with a primary headache disorder (migraine, tension-type, cluster)
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Want to reduce reliance on medications
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Are motivated to take an active role in their health
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Seek evidence-based, non-pharmacological approaches
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Are tired of missing out on life due to headaches
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Want personalized guidance without frequent clinic visits
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Value structured, progressive treatment approaches
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Can commit 20-30 minutes daily for 12 weeks
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Program Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">12 Weeks</div>
              <p className="text-sm">Structured program duration</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">4 Phases</div>
              <p className="text-sm">Progressive treatment approach</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">20-30 min</div>
              <p className="text-sm">Daily time commitment</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">50+ Exercises</div>
              <p className="text-sm">Comprehensive exercise library</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">7 Activity Sheets</div>
              <p className="text-sm">Educational modules</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">5 Assessments</div>
              <p className="text-sm">Validated outcome measures</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Ready to Recover & Reclaim?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6 text-lg">
            Join hundreds of individuals who have transformed their relationship with headaches 
            through our evidence-based program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/dashboard"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center font-medium"
            >
              Go to Dashboard
            </Link>
            <Link 
              to="/learn-more"
              className="px-8 py-3 bg-background text-foreground border-2 border-border rounded-lg hover:bg-muted transition-colors text-center font-medium"
            >
              Learn More
            </Link>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default MarketingOverview;
