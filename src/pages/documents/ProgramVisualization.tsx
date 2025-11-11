import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProgramVisualization = () => {
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
        <h1 className="text-2xl font-semibold">Program Visualization & Journey Maps</h1>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Complete Program Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            The complete program flow showing progression from entry through all four phases to 
            independent headache management.
          </p>
          <div className="bg-gray-50 p-4 rounded space-y-2 text-sm">
            <p><strong>Phase 1 (Week 1):</strong> Baseline assessment with HIT-6 and headache type identification</p>
            <p><strong>Phase 2 (Weeks 2-11):</strong> Active management including exercises, education, and lifestyle modifications</p>
            <p><strong>Phase 3 (Week 12, Days 1-7):</strong> Progress evaluation with complete assessment battery</p>
            <p><strong>Phase 4 (Week 12, Day 8+):</strong> Personalized maintenance program creation</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Journey Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-semibold">Week 1: Discovery</p>
              <p className="text-sm text-gray-600">Complete assessment, understand headache profile, begin tracking</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-semibold">Weeks 2-4: Learning</p>
              <p className="text-sm text-gray-600">Learn exercises, understand pain science, identify triggers</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-semibold">Weeks 5-8: Building Skills</p>
              <p className="text-sm text-gray-600">Practice strengthening, implement lifestyle changes, manage triggers</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="font-semibold">Weeks 9-11: Mastery</p>
              <p className="text-sm text-gray-600">Advanced exercises, mindful practices, consistent self-management</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <p className="font-semibold">Week 12: Evaluation</p>
              <p className="text-sm text-gray-600">Complete reassessment, recognize progress, plan maintenance</p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4 py-2">
              <p className="font-semibold">Beyond: Independence</p>
              <p className="text-sm text-gray-600">Independent management with sustained improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Phase 2 Weekly Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="font-semibold mb-4">Typical Week Pattern:</p>
            <div className="grid grid-cols-7 gap-2 mb-4">
              <div className="text-center p-2 bg-blue-100 rounded text-xs">
                <p className="font-semibold">Day 1</p>
                <p>Set A</p>
              </div>
              <div className="text-center p-2 bg-green-100 rounded text-xs">
                <p className="font-semibold">Day 2</p>
                <p>Set B</p>
              </div>
              <div className="text-center p-2 bg-purple-100 rounded text-xs">
                <p className="font-semibold">Day 3</p>
                <p>Set C</p>
              </div>
              <div className="text-center p-2 bg-blue-100 rounded text-xs">
                <p className="font-semibold">Day 4</p>
                <p>Set A</p>
              </div>
              <div className="text-center p-2 bg-green-100 rounded text-xs">
                <p className="font-semibold">Day 5</p>
                <p>Set B</p>
              </div>
              <div className="text-center p-2 bg-purple-100 rounded text-xs">
                <p className="font-semibold">Day 6</p>
                <p>Set C</p>
              </div>
              <div className="text-center p-2 bg-yellow-100 rounded text-xs">
                <p className="font-semibold">Day 7</p>
                <p>Review</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Each week follows this pattern with progressively more challenging exercises. 
              Day 7 includes a comprehensive weekly review and progress assessment.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Intervention Components Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-semibold text-blue-900 mb-3">Physical</p>
              <ul className="text-xs space-y-1">
                <li>• Breathing Exercises</li>
                <li>• Myofascial Release</li>
                <li>• Progressive Strengthening</li>
                <li>• Mobility Training</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-green-900 mb-3">Cognitive-Behavioral</p>
              <ul className="text-xs space-y-1">
                <li>• Pain Neuroscience Ed</li>
                <li>• Belief Modification</li>
                <li>• Stress Management</li>
                <li>• Mindfulness</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="font-semibold text-yellow-900 mb-3">Lifestyle</p>
              <ul className="text-xs space-y-1">
                <li>• Sleep Hygiene</li>
                <li>• Trigger Management</li>
                <li>• Medication Optimization</li>
                <li>• Activity Pacing</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-semibold text-purple-900 mb-3">Self-Management</p>
              <ul className="text-xs space-y-1">
                <li>• Daily Tracking</li>
                <li>• Weekly Reviews</li>
                <li>• Goal Setting</li>
                <li>• Progress Monitoring</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-100 rounded-lg text-center">
            <p className="font-semibold text-green-900">
              ↓ All Components Lead To ↓
            </p>
            <p className="text-sm text-green-800 mt-2">
              Improved Headache Management & Quality of Life
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Assessment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">Phase 1 (Week 1)</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• Day 1: HIT-6 Baseline Assessment</li>
                <li>• Days 2-3: Headache Type Survey</li>
                <li>• Days 1-7: Daily Tracking</li>
              </ul>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-semibold">Phase 2 (Weeks 2-11)</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• Weekly progress reviews (10 weeks)</li>
                <li>• Continuous headache tracking (70 days)</li>
                <li>• Activity sheet completion throughout</li>
              </ul>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-semibold">Phase 3 (Week 12, Days 1-7)</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• Days 1-2: HIT-6 Outcome & MIDAS</li>
                <li>• Days 3-4: PSFS & GPOC</li>
              </ul>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-semibold">Phase 4 (Week 12, Day 8+)</p>
              <ul className="text-sm space-y-1 mt-2">
                <li>• Program customization (2-3 days)</li>
                <li>• Long-term goal setting</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Outcome Measurement Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="font-semibold text-green-900 mb-3">Primary Outcomes</p>
              <ul className="text-sm space-y-2">
                <li><strong>Headache Impact:</strong> HIT-6</li>
                <li><strong>Disability:</strong> MIDAS</li>
                <li><strong>Function:</strong> PSFS</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="font-semibold text-yellow-900 mb-3">Secondary Outcomes</p>
              <ul className="text-sm space-y-2">
                <li><strong>Perceived Change:</strong> GPOC</li>
                <li><strong>Self-Efficacy:</strong> PSC subscales</li>
                <li><strong>Pain Beliefs:</strong> PSC subscales</li>
                <li><strong>Frequency/Intensity:</strong> Tracking data</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="font-semibold text-purple-900 mb-3">Process Measures</p>
              <ul className="text-sm space-y-2">
                <li><strong>Exercise Adherence:</strong> Completion rates</li>
                <li><strong>Activity Sheets:</strong> Completion tracking</li>
                <li><strong>Tracking Consistency:</strong> Daily logs</li>
                <li><strong>Weekly Reviews:</strong> Participation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ProgramVisualization;