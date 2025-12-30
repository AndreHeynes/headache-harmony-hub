import { Play, Clock, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const PhaseOneVideoPlayer = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8">
        {/* Back Navigation */}
        <Link to="/phase-one" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Phase 1
        </Link>

        {/* Video Player Placeholder */}
        <Card className="overflow-hidden">
          <div className="aspect-video bg-muted relative flex items-center justify-center">
            {/* Placeholder state - replace with actual video when available */}
            <div className="text-center space-y-4 p-8">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Play className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Phase 1 Introduction Video
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                This video will walk you through everything you need to know about Phase 1 
                of your headache recovery program.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>4-5 minutes</span>
              </div>
              <div className="pt-4">
                <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 rounded-md inline-block">
                  Video coming soon — please read the guide below for now
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Video Topics Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              What This Video Covers
            </CardTitle>
            <CardDescription>
              Key topics from the Phase 1 introduction
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                {
                  title: "The Purpose of Phase 1",
                  description: "Why understanding your starting point matters for recovery"
                },
                {
                  title: "Your Daily Tasks",
                  description: "What you'll be doing each day over the next 7 days"
                },
                {
                  title: "The Questionnaires",
                  description: "How to complete the validated assessment tools"
                },
                {
                  title: "Daily Tracking",
                  description: "How to log your headaches and identify patterns"
                },
                {
                  title: "What Comes Next",
                  description: "How Phase 1 data shapes your personalized Phase 2 plan"
                }
              ].map((topic, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{topic.title}</p>
                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/documents/phase-one-guide">
              <FileText className="h-4 w-4 mr-2" />
              Read the Phase 1 Guide
            </Link>
          </Button>
          <Button asChild>
            <Link to="/phase-one">
              Continue to Day 1 Tasks
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhaseOneVideoPlayer;
