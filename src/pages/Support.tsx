
import React, { useState } from "react";
import { Brain, Mail, MessageSquare, Search, HelpCircle, FileText, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    toast.success("Support request submitted. We'll respond within 24 hours.");
    setContactOpen(false);
    setContactForm({ email: "", subject: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const faqs = [
    {
      question: "How do I track my migraine symptoms?",
      answer: "You can log your migraine symptoms through the dashboard. Click on 'Log Symptoms' and fill in the details about your migraine episode, including pain level, duration, triggers, and any medications taken."
    },
    {
      question: "Can I export my migraine data?",
      answer: "Yes! You can export your migraine tracking data in CSV or PDF format. Go to your profile settings and select 'Export Data' to download your records."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. Go to 'Billing' and click on 'Cancel Subscription'. Your access will continue until the end of your current billing cycle."
    },
    {
      question: "Is my health data secure?",
      answer: "We take data security very seriously. All your health information is encrypted and stored securely following HIPAA-compliant protocols. We never share your personal health data with third parties without your explicit consent."
    },
    {
      question: "How can I update my payment information?",
      answer: "You can update your payment method in the account settings under 'Billing & Payments'. We use secure payment processors and don't store your full card details on our servers."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-neutral-800" />
            <span className="text-xl text-neutral-800">MigraineTracker</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-neutral-600 hover:text-neutral-900">Home</Link>
            <Link to="/learn-more" className="text-neutral-600 hover:text-neutral-900">Learn More</Link>
            <Link to="/pricing" className="text-neutral-600 hover:text-neutral-900">Pricing</Link>
            <Link to="/policy" className="text-neutral-600 hover:text-neutral-900">Policies</Link>
            <Link to="/support" className="text-neutral-900 font-medium">Support</Link>
          </nav>
          <button className="md:hidden">
            <span className="sr-only">Open menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <main className="pt-20 pb-16">
        <section className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">How can we help you?</h1>
            <p className="text-lg text-neutral-600">Find answers, resources, and get support for MigraineTracker</p>
            
            <div className="relative mt-8 max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search for help topics..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <Tabs defaultValue="guides" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="guides">Help Guides</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Getting Started
                    </CardTitle>
                    <CardDescription>Learn the basics of using MigraineTracker</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-blue-600 hover:underline">Setting up your account</a></li>
                      <li><a href="#" className="text-blue-600 hover:underline">Tracking your first migraine</a></li>
                      <li><a href="#" className="text-blue-600 hover:underline">Understanding your dashboard</a></li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">View all guides</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Advanced Features
                    </CardTitle>
                    <CardDescription>Get more out of your MigraineTracker experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-blue-600 hover:underline">Creating custom triggers</a></li>
                      <li><a href="#" className="text-blue-600 hover:underline">Using the analytics dashboard</a></li>
                      <li><a href="#" className="text-blue-600 hover:underline">Sharing reports with healthcare providers</a></li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">View all features</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Account & Privacy
                    </CardTitle>
                    <CardDescription>Manage your account security and data privacy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-blue-600 hover:underline">Password reset instructions</a></li>
                      <li><a href="#" className="text-blue-600 hover:underline">Managing notification preferences</a></li>
                      <li><a href="#" className="text-blue-600 hover:underline">Data export and deletion</a></li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">View all settings</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Billing Support
                    </CardTitle>
                    <CardDescription>Get help with payments and subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-blue-600 hover:underline">Updating payment methods</a></li>
                      <li><a href="#" className="text-blue-600 hover:underline">Understanding your invoice</a></li>
                      <li><a href="#" className="text-blue-600 hover:underline">Cancellation and refund policy</a></li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">View billing help</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-neutral-500">Can't find what you're looking for?</p>
                  <Button onClick={() => setContactOpen(true)}>Contact Support</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Our Support Team</CardTitle>
                  <CardDescription>We'll respond to your inquiry within 24 hours (Mon-Fri)</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email" 
                        placeholder="your-email@example.com"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject"
                        name="subject"
                        placeholder="What's your question about?"
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Please describe your issue in detail..."
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-neutral-500">By submitting this form, you agree to our privacy policy and terms of service.</p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="community">
              <Card>
                <CardHeader>
                  <CardTitle>Community Support</CardTitle>
                  <CardDescription>Join our members-only community for peer support and discussion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Private Community Forum
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      Our private forums are available exclusively to MigraineTracker subscribers. Join discussions with other members, share your experiences, and learn from others.
                    </p>
                    <Button>Sign In To Access Forums</Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Latest Discussions</h4>
                      <ul className="space-y-2">
                        <li className="text-sm">• Natural remedies discussion thread</li>
                        <li className="text-sm">• Tracking visual auras and symptoms</li>
                        <li className="text-sm">• Weather-related triggers and prevention</li>
                      </ul>
                    </div>
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Member Resources</h4>
                      <ul className="space-y-2">
                        <li className="text-sm">• Community guidelines</li>
                        <li className="text-sm">• How to safely share experiences</li>
                        <li className="text-sm">• Moderation and support policies</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-neutral-500">
                    Community access is restricted to verified members only. All forum activities are moderated to ensure a supportive environment.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
            <DialogDescription>
              Fill out the form below and our support team will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="popup-email">Email</Label>
              <Input 
                id="popup-email" 
                name="email"
                type="email" 
                value={contactForm.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="popup-subject">Subject</Label>
              <Input 
                id="popup-subject" 
                name="subject"
                value={contactForm.subject}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="popup-message">Message</Label>
              <textarea
                id="popup-message"
                name="message"
                rows={5}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={contactForm.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <DialogFooter>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
                <li><Link to="/support" className="text-neutral-600 hover:text-neutral-900">Help Center</Link></li>
                <li><Link to="/policy" className="text-neutral-600 hover:text-neutral-900">Privacy & Terms</Link></li>
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-600 hover:text-neutral-900">Email Us</a></li>
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

export default Support;
