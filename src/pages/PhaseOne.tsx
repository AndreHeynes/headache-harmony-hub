
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Brain, 
  ChartLine, 
  Circle, 
  Play 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const PhaseOne = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Initial Assessment", completed: false },
    { id: 2, title: "Watch Introduction Video", completed: false },
    { id: 3, title: "Set Up Daily Reminders", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-neutral-800" />
            <span className="text-xl text-neutral-800">MigraineTracker</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-neutral-600 hover:text-neutral-900">Dashboard</Link>
            <Link to="/profile" className="text-neutral-600 hover:text-neutral-900">Profile</Link>
          </nav>
          <button className="md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="pt-20 px-4 pb-12">
        <div className="container mx-auto">
          <h1 className="text-3xl mb-8 text-neutral-900">Understanding where you are starting from</h1>
          
          {/* Top Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Current Phase Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Current Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg">Phase 1</span>
                  <Link to="/phase-one" className="text-neutral-600 hover:text-neutral-900 flex items-center">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <Progress value={15} className="h-2 mb-2" />
                <p className="text-neutral-600">Day 1 of 7</p>
              </CardContent>
            </Card>

            {/* Today's Tasks Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Today's Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tasks.map((task) => (
                    <li 
                      key={task.id}
                      className="flex items-center cursor-pointer hover:bg-neutral-50 p-2 rounded"
                      onClick={() => toggleTask(task.id)}
                    >
                      <Circle className={`mr-3 h-5 w-5 ${task.completed ? "text-neutral-800 fill-neutral-800" : "text-neutral-400"}`} />
                      <span className={task.completed ? "line-through text-neutral-500" : ""}>{task.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Program Timeline Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Program Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <span>Phase 1: Week 1</span>
                    <Badge className="bg-neutral-800 hover:bg-neutral-700">Current</Badge>
                  </li>
                  <li className="flex justify-between items-center text-neutral-500">
                    <span>Phase 2: Weeks 2-10</span>
                    <Badge variant="outline" className="text-neutral-500">Upcoming</Badge>
                  </li>
                  <li className="flex justify-between items-center text-neutral-500">
                    <span>Phase 3: Week 11</span>
                    <Badge variant="outline" className="text-neutral-500">Upcoming</Badge>
                  </li>
                  <li className="flex justify-between items-center text-neutral-500">
                    <span>Phase 4: Week 12+</span>
                    <Badge variant="outline" className="text-neutral-500">Upcoming</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Day 1 Content Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Day 1 Content</CardTitle>
                  <ArrowRight className="h-5 w-5 text-neutral-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 mb-6">
                  Please review the description of how Phase 1 functions. A guide to participating in Phase 1.
                </p>
                <div className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-12 w-12 text-white mb-2" />
                    <p className="text-white">Phase 1 Introduction Video</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* External Tracking App Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">External Headache Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-neutral-800 rounded-lg p-8 flex items-center justify-center h-[200px]">
                  <div className="text-center">
                    <ChartLine className="h-12 w-12 text-white mb-2" />
                    <p className="text-white">Connect Your External Tracking App</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-neutral-100 py-8 mt-12">
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

export default PhaseOne;
