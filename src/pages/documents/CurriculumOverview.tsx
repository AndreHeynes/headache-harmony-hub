import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CurriculumOverview = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded-full hover:bg-neutral-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold">Curriculum Overview</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Program at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            A 12-week evidence-based program integrating assessment, physical therapy, 
            cognitive-behavioral strategies, and self-management techniques.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div><strong>Duration:</strong> 12 weeks (4 phases)</div>
            <div><strong>Time Commitment:</strong> 20-30 min/day</div>
            <div><strong>Format:</strong> Self-paced with structured guidance</div>
            <div><strong>Evidence Base:</strong> Validated clinical questionnaires</div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phase 1: Understanding Baseline (Week 1 - 7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Learning Outcomes:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Establish headache impact baseline (HIT-6)</li>
              <li>Identify headache type and characteristics</li>
              <li>Recognize patterns and triggers</li>
              <li>Set foundation for personalized treatment</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-2">Daily Activities:</p>
            <ul className="text-sm space-y-1">
              <li><strong>Day 1:</strong> Introduction & HIT-6 Assessment</li>
              <li><strong>Day 2:</strong> Headache Type Identification (Part 1)</li>
              <li><strong>Day 3:</strong> Headache Type Identification (Part 2)</li>
              <li><strong>Days 4-7:</strong> Symptom tracking & pattern recognition</li>
            </ul>
          </div>
          
          <p className="text-sm italic">
            Key Focus: Understanding your unique headache profile
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phase 2: Active Management (Weeks 2-11 - 70 Days)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Learning Outcomes:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Master therapeutic exercises (mobility, strength, relaxation)</li>
              <li>Develop cognitive-behavioral skills (pain psychology, stress management)</li>
              <li>Implement lifestyle modifications (sleep hygiene, trigger management)</li>
              <li>Build consistent self-management habits</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-2">Weekly Structure (10 Weeks):</p>
            <div className="text-sm space-y-2">
              <div className="border-l-4 border-blue-500 pl-3">
                <strong>Weeks 1-3:</strong> Foundation phase
                <ul className="list-disc pl-5 mt-1">
                  <li>Breathing exercises & basic mobility</li>
                  <li>Introduction to pain mechanisms (AS 3)</li>
                  <li>Developing helpful beliefs (AS 2)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3">
                <strong>Weeks 4-7:</strong> Progressive strengthening
                <ul className="list-disc pl-5 mt-1">
                  <li>Neck strengthening (beginner to intermediate)</li>
                  <li>Sleep hygiene strategies (AS 4)</li>
                  <li>Trigger identification & management (AS 5)</li>
                  <li>Medication optimization (AS 5.1)</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-3">
                <strong>Weeks 8-10:</strong> Advanced integration
                <ul className="list-disc pl-5 mt-1">
                  <li>Advanced strengthening & combined movements</li>
                  <li>Mindful headache journaling (MHEJ)</li>
                  <li>Comprehensive self-management integration</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="font-medium mb-2">Daily Components:</p>
            <ul className="text-sm space-y-1">
              <li>• Physical exercises (15-20 min): Breathing, mobility, strengthening</li>
              <li>• Activity sheets (10-15 min): Psycho-educational modules</li>
              <li>• Headache tracking (2-5 min): Daily logging</li>
              <li>• Weekly reviews: Progress assessment & adjustments</li>
            </ul>
          </div>
          
          <p className="text-sm italic">
            Key Focus: Building comprehensive self-management skills through progressive exercise and education
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phase 3: Progress Evaluation (Week 12, Days 1-7)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Learning Outcomes:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Quantify improvement across multiple domains</li>
              <li>Identify most effective interventions</li>
              <li>Recognize areas needing continued focus</li>
              <li>Prepare personalized maintenance plan</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-2">Assessment Battery:</p>
            <ul className="text-sm space-y-1">
              <li><strong>HIT-6:</strong> Headache impact reassessment</li>
              <li><strong>MIDAS:</strong> Disability measurement</li>
              <li><strong>PSFS:</strong> Functional goal achievement</li>
              <li><strong>GPOC:</strong> Global change perception</li>
            </ul>
          </div>
          
          <p className="text-sm italic">
            Key Focus: Measuring progress and identifying successful strategies
          </p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phase 4: Maintenance Planning (Week 12, Day 8+)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-medium mb-2">Learning Outcomes:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Create personalized long-term program</li>
              <li>Select most effective exercises from Phase 2</li>
              <li>Set sustainable daily/weekly routines</li>
              <li>Develop relapse prevention strategies</li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-2">Activities:</p>
            <ul className="text-sm space-y-1">
              <li>• Exercise library review & selection</li>
              <li>• Custom program builder</li>
              <li>• Goal setting for ongoing management</li>
              <li>• Long-term tracking plan</li>
            </ul>
          </div>
          
          <p className="text-sm italic">
            Key Focus: Transitioning to independent long-term self-management
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Methodologies Integrated Throughout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">Physical Interventions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Breathing & relaxation</li>
                <li>Myofascial release techniques</li>
                <li>Progressive neck strengthening</li>
                <li>Postural education</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Cognitive-Behavioral:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pain neuroscience education</li>
                <li>Belief modification</li>
                <li>Stress management</li>
                <li>Mindfulness practices</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Lifestyle Modifications:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Sleep optimization</li>
                <li>Trigger identification</li>
                <li>Medication management</li>
                <li>Activity pacing</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Self-Management:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Daily tracking & monitoring</li>
                <li>Weekly progress reviews</li>
                <li>Goal setting</li>
                <li>Readiness for change assessment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default CurriculumOverview;