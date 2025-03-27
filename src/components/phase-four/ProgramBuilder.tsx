
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Clock, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ProgramBuilder = () => {
  return (
    <section className="bg-gray-800 rounded-xl p-8 mb-8">
      <h2 className="text-2xl font-bold mb-6">Customize Your Routine</h2>
      
      {/* Selected Exercises Customization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Selected Exercises</h3>
          
          {/* Exercise Item with Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-12 bg-blue-600 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-medium">Neck Flexion/Extension</h4>
                  <p className="text-sm text-gray-400">Mobility Exercise</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <label className="text-sm">Sets</label>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-lg rounded-r-none">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input type="number" className="w-12 h-8 bg-gray-800 text-center" defaultValue={3} />
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-lg rounded-l-none">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm">Reps</label>
                  <div className="flex items-center">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-lg rounded-r-none">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <input type="number" className="w-12 h-8 bg-gray-800 text-center" defaultValue={10} />
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-lg rounded-l-none">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="bg-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Weekly Schedule</h3>
          <div className="grid grid-cols-7 gap-2">
            {/* Days of Week */}
            <div className="text-center p-2 text-sm text-gray-400">Mon</div>
            <div className="text-center p-2 text-sm text-gray-400">Tue</div>
            <div className="text-center p-2 text-sm text-gray-400">Wed</div>
            <div className="text-center p-2 text-sm text-gray-400">Thu</div>
            <div className="text-center p-2 text-sm text-gray-400">Fri</div>
            <div className="text-center p-2 text-sm text-gray-400">Sat</div>
            <div className="text-center p-2 text-sm text-gray-400">Sun</div>
            
            {/* Schedule Slots */}
            <div className="bg-gray-800 rounded-lg p-2 min-h-[100px] border-2 border-dashed border-gray-600">
              <div className="bg-blue-600 rounded p-2 text-sm mb-2">Neck Flexion</div>
              <div className="bg-green-600 rounded p-2 text-sm">Isometric Hold</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-2 min-h-[100px] border-2 border-dashed border-gray-600"></div>
            <div className="bg-gray-800 rounded-lg p-2 min-h-[100px] border-2 border-dashed border-gray-600">
              <div className="bg-purple-600 rounded p-2 text-sm">Upper Trap Stretch</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-2 min-h-[100px] border-2 border-dashed border-gray-600"></div>
            <div className="bg-gray-800 rounded-lg p-2 min-h-[100px] border-2 border-dashed border-gray-600">
              <div className="bg-blue-600 rounded p-2 text-sm">Neck Flexion</div>
            </div>
            <div className="bg-gray-600 rounded-lg p-2 min-h-[100px] flex items-center justify-center">
              <span className="text-sm text-gray-400">Rest Day</span>
            </div>
            <div className="bg-gray-600 rounded-lg p-2 min-h-[100px] flex items-center justify-center">
              <span className="text-sm text-gray-400">Rest Day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Sheets */}
      <div id="activity-sheets" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Sleep Hygiene Form */}
        <div className="bg-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Sleep Hygiene (AS3)</h3>
              <Link 
                to="/phase-two" 
                className="ml-3 text-blue-400 hover:text-blue-300 text-sm flex items-center"
                title="View Activity Sheet 3 from Phase 2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <span className="ml-1">View Original</span>
              </Link>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Bedtime Routine</label>
              <textarea className="w-full bg-gray-800 rounded-lg p-3" rows={3} placeholder="Describe your evening routine..."></textarea>
            </div>
            <div>
              <label className="block text-sm mb-2">Sleep Environment</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Dark room
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Comfortable temperature
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Quiet environment
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Trigger Management Form */}
        <div className="bg-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Trigger Management (AS4)</h3>
              <Link 
                to="/phase-two" 
                className="ml-3 text-blue-400 hover:text-blue-300 text-sm flex items-center"
                title="View Activity Sheet 4 from Phase 2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                <span className="ml-1">View Original</span>
              </Link>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Identified Triggers</label>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-600 px-3 py-1 rounded-full text-sm">Poor Posture</span>
                <span className="bg-gray-600 px-3 py-1 rounded-full text-sm">Screen Time</span>
                <span className="bg-gray-600 px-3 py-1 rounded-full text-sm">Stress</span>
                <Button variant="outline" className="px-3 py-1 rounded-full text-sm h-auto">+ Add New</Button>
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Management Strategy</label>
              <textarea className="w-full bg-gray-800 rounded-lg p-3" rows={3} placeholder="How do you plan to manage these triggers?"></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Support */}
      <div className="bg-gray-700 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Walkthrough */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">Program Walkthrough</h3>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            </div>
          </div>

          {/* FAQ Guide */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Guide</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-lg p-4">
                <button className="flex items-center justify-between w-full">
                  <span className="font-medium">How many exercises should I choose?</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <button className="flex items-center justify-between w-full">
                  <span className="font-medium">How often should I exercise?</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <div className="bg-gray-800 rounded-lg p-4">
                <button className="flex items-center justify-between w-full">
                  <span className="font-medium">When should I take rest days?</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Summary Section */}
      <div className="bg-gray-700 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-bold mb-1">Program Summary</h3>
            <p className="text-sm text-gray-400">Review and finalize your personalized exercise program</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" className="text-sm h-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              Edit Program
            </Button>
            <Button className="text-sm h-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Save & Download PDF
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg">
          <div className="flex items-center">
            <div className="w-2 h-12 bg-blue-600 rounded-full mr-4"></div>
            <div>
              <h4 className="font-medium">Neck Flexion/Extension</h4>
              <p className="text-sm text-gray-400">3 sets × 10 reps</p>
            </div>
          </div>
          <span className="text-sm bg-blue-600 px-3 py-1 rounded-full">Mon, Wed, Fri</span>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end items-center">
        <Button className="px-6 py-3 bg-green-600 hover:bg-green-700">
          Complete Program
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Floating Help Button */}
      <div className="fixed bottom-8 right-8">
        <Button size="icon" className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </Button>
      </div>
    </section>
  );
};

export default ProgramBuilder;
