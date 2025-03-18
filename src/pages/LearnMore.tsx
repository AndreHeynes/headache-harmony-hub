
import { Brain, Calendar, PieChart, Clock, Activity, Pill, Sun, AlertCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LearnMore = () => {
  const migraine101 = [
    {
      title: "What are migraines?",
      content: "Migraines are recurring headaches that cause moderate to severe throbbing or pulsing pain, typically on one side of the head. They're often accompanied by nausea, vomiting, and extreme sensitivity to light and sound."
    },
    {
      title: "Common triggers",
      content: "Migraine triggers vary from person to person but may include stress, certain foods, skipped meals, sleep changes, hormonal changes, weather changes, and sensory stimuli like bright lights."
    },
    {
      title: "Types of migraines",
      content: "Migraines come in different forms, including migraines with aura (visual disturbances), migraines without aura, chronic migraines, and vestibular migraines that affect balance."
    }
  ];

  const trackingFeatures = [
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Calendar Tracking",
      description: "Log your migraines on an easy-to-use calendar to identify patterns and frequencies."
    },
    {
      icon: <PieChart className="h-6 w-6 text-primary" />,
      title: "Detailed Analytics",
      description: "View comprehensive reports that analyze your migraine patterns, triggers, and treatment effectiveness."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Duration Monitoring",
      description: "Track how long your migraines last to better understand your condition's severity."
    },
    {
      icon: <Activity className="h-6 w-6 text-primary" />,
      title: "Intensity Tracking",
      description: "Rate your pain levels and symptoms to monitor changes over time."
    },
    {
      icon: <Pill className="h-6 w-6 text-primary" />,
      title: "Medication Tracking",
      description: "Record which medications you take and how effective they are for your migraines."
    },
    {
      icon: <Sun className="h-6 w-6 text-primary" />,
      title: "Trigger Identification",
      description: "Log potential triggers like foods, activities, or environmental factors to identify patterns."
    }
  ];

  const lifestyleSection = [
    {
      title: "Regular Sleep Schedule",
      content: "Maintaining consistent sleep patterns can help reduce migraine frequency. Aim for 7-9 hours of quality sleep each night."
    },
    {
      title: "Stress Management",
      content: "Practice stress-reduction techniques like meditation, deep breathing, or yoga to help prevent stress-induced migraines."
    },
    {
      title: "Hydration & Nutrition",
      content: "Stay well-hydrated and maintain regular, balanced meals. Some people find certain dietary changes helpful in reducing migraines."
    },
    {
      title: "Regular Exercise",
      content: "Moderate, regular exercise can help reduce the frequency and severity of migraines for many people."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header - reusing the same header style from the mockup */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-neutral-800" />
            <span className="text-xl text-neutral-800">MigraineTracker</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="/" className="text-neutral-600 hover:text-neutral-900">Home</a>
            <a href="/learn-more" className="text-neutral-900 font-medium">Learn More</a>
            <a href="#" className="text-neutral-600 hover:text-neutral-900">Features</a>
            <a href="#" className="text-neutral-600 hover:text-neutral-900">Contact</a>
          </nav>
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-neutral-200 w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-neutral-900">Understanding Migraines</h1>
              <p className="text-lg md:text-xl text-neutral-600 mb-8">
                Knowledge is power when it comes to managing migraines. Learn about the causes, symptoms, 
                and treatments to take control of your condition.
              </p>
            </div>
          </div>
        </section>

        {/* Migraine 101 Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold mb-8 text-center">Migraine 101</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {migraine101.map((item, index) => (
                  <Card key={index} className="shadow-md">
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                      <p className="text-neutral-600">{item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                  When to See a Doctor
                </h3>
                <p className="mb-4">
                  While many migraines can be managed at home, certain symptoms require immediate medical attention:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                  <li>Sudden, severe headache different from previous headaches</li>
                  <li>Headache accompanied by fever, stiff neck, confusion, seizures, double vision, or weakness</li>
                  <li>Headache following a head injury</li>
                  <li>Chronic or persistent headaches that worsen after coughing, exertion, straining, or sudden movement</li>
                  <li>New headache pain if you're over 50</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* How Our App Helps Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold mb-2 text-center">How MigraineTracker Helps</h2>
              <p className="text-center text-neutral-600 mb-12">Our comprehensive tracking tools help you understand your unique migraine patterns</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trackingFeatures.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 rounded-lg">
                  Start Tracking Today
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Lifestyle Management Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold mb-8 text-center">Lifestyle Management</h2>
              <p className="text-center text-neutral-600 mb-8">
                Beyond tracking, these lifestyle approaches can help reduce migraine frequency and severity
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {lifestyleSection.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-neutral-600">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-neutral-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-4">Ready to Take Control of Your Migraines?</h2>
              <p className="text-lg mb-8 text-neutral-300">
                Join thousands of users who have reduced their migraine frequency and severity through better tracking and management.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button className="bg-white text-neutral-900 hover:bg-neutral-100 px-8 py-6 rounded-lg text-lg">
                  Create Free Account
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-lg text-lg">
                  Learn More About Plans
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="mb-4">About</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Our Story</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Team</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Help Center</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Privacy</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Email Us</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Phone</a></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Office</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
                  </svg>
                </a>
                <a href="#" className="text-neutral-600 hover:text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-8 8m0-8l8 8" />
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

export default LearnMore;
