
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Calendar, 
  CheckCircle2, 
  CircleOff, 
  Clock, 
  Heart, 
  Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Morning Exercise Routine", status: "completed", completed: true },
    { id: 2, title: "Meditation Session", status: "in-progress", completed: false },
    { id: 3, title: "Pain Journal Entry", status: "not-started", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed, status: !task.completed ? "completed" : "in-progress" } 
          : task
      )
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-neutral-800 hover:bg-neutral-700">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-neutral-600 hover:bg-neutral-500">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="text-neutral-700">Not Started</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-neutral-800" />
            <span className="text-xl text-neutral-800">MigraineTracker</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-neutral-600">
              <span>Current Phase: </span>
              <span>2</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20 px-4 pb-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Calendar Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Program Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Start: Phase 1, Day 1</span>
                    <span className="text-neutral-500">Jan 1, 2025</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Current: Phase 2, Day 14</span>
                    <span className="text-neutral-500">Feb 15, 2025</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>End: Phase 4, Day 7</span>
                    <span className="text-neutral-500">Apr 1, 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Phase */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="60" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        strokeWidth="8" 
                      />
                      <circle 
                        cx="64" 
                        cy="64" 
                        r="60" 
                        fill="none" 
                        stroke="#1f2937" 
                        strokeWidth="8" 
                        strokeDasharray="377" 
                        strokeDashoffset="207" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-medium">45%</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Phase Progress</span>
                    <span>14/30 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tasks Completed</span>
                    <span>8/12</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Program Timeline */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Program Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Phase 1: Week 1</span>
                    <Badge className="bg-neutral-800 hover:bg-neutral-700">Completed</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phase 2: Weeks 2-10</span>
                    <Badge className="bg-neutral-600 hover:bg-neutral-500">In Progress</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phase 3: Week 11</span>
                    <Badge variant="outline" className="text-neutral-700">Not Started</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phase 4: Weeks 12+</span>
                    <Badge variant="outline" className="text-neutral-700">Not Started</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Today's Tasks */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Tasks - Day 14</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center">
                      <Checkbox 
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="h-5 w-5"
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {task.title}
                      </label>
                      <div className="ml-auto">
                        {getStatusBadge(task.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* External App */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Connected App</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 border rounded flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-6 w-6 text-neutral-700" />
                    <span className="ml-3">Health App</span>
                  </div>
                  <span className="text-neutral-600">Connected</span>
                </div>
                <div className="mt-4 p-4 bg-gray-50 border border-dashed rounded-md">
                  <div className="text-center">
                    <h4 className="font-medium mb-2">Health Metrics</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-neutral-600">Sleep</div>
                        <div className="font-medium">7.2 hrs</div>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-neutral-600">Steps</div>
                        <div className="font-medium">8,453</div>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-neutral-600">Water</div>
                        <div className="font-medium">1.3L</div>
                      </div>
                      <div className="bg-white p-3 rounded shadow-sm">
                        <div className="text-neutral-600">Stress</div>
                        <div className="font-medium">Medium</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-neutral-600 hover:text-neutral-900">Our Story</Link></li>
                <li><Link to="/" className="text-neutral-600 hover:text-neutral-900">Team</Link></li>
                <li><Link to="/" className="text-neutral-600 hover:text-neutral-900">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/support" className="text-neutral-600 hover:text-neutral-900">Help Center</Link></li>
                <li><Link to="/policy" className="text-neutral-600 hover:text-neutral-900">Privacy</Link></li>
                <li><Link to="/" className="text-neutral-600 hover:text-neutral-900">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><Link to="/support" className="text-neutral-600 hover:text-neutral-900">Email Us</Link></li>
                <li><Link to="/" className="text-neutral-600 hover:text-neutral-900">Phone</Link></li>
                <li><Link to="/" className="text-neutral-600 hover:text-neutral-900">Office</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
