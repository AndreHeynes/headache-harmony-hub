import React, { useState } from "react";
import { Mail, MessageSquare, Search, HelpCircle, FileText, Shield } from "lucide-react";
import MainHeader from "@/components/layout/MainHeader";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import PageFooter from "@/components/layout/PageFooter";

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
      question: "How does the recovery program work?",
      answer: "The program guides you through 4 phases over approximately 3 months, using evidence-based exercises and education to help manage cervicogenic headaches. Each phase builds on the previous one."
    },
    {
      question: "How do I track my headache symptoms?",
      answer: "You can log your headache symptoms through the Headache Journal, which is linked from your dashboard and exercise pages. Track frequency, intensity, and related factors."
    },
    {
      question: "Can I export my progress data?",
      answer: "Currently during the beta period, data export is not available. This feature is planned for future releases."
    },
    {
      question: "Is my health data secure?",
      answer: "We take data security very seriously. All your health information is encrypted and stored securely. We never share your personal health data with third parties without your explicit consent."
    },
    {
      question: "How do I provide feedback during the beta?",
      answer: "You can use the feedback button available on every page to submit bug reports, feature requests, or general feedback. Your input helps us improve the program."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />

      <main className="pt-20 pb-16">
        <section className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-4">How can we help you?</h1>
            <p className="text-lg text-muted-foreground">Find answers, resources, and get support for Recover & Reclaim</p>
            
            <div className="relative mt-8 max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help topics..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="guides">Program Guides</TabsTrigger>
            </TabsList>
            
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
                  <p className="text-sm text-muted-foreground">Can't find what you're looking for?</p>
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
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <Link to="/policy" className="text-primary hover:underline">privacy policy and terms of service</Link>.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Getting Started
                    </CardTitle>
                    <CardDescription>Learn the basics of the recovery program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li><Link to="/dashboard" className="text-primary hover:underline">Go to your dashboard</Link></li>
                      <li><Link to="/phase-one" className="text-primary hover:underline">Start Phase 1: Education</Link></li>
                      <li><Link to="/learn-more" className="text-primary hover:underline">Learn more about the program</Link></li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5" />
                      Program Phases
                    </CardTitle>
                    <CardDescription>Understand each phase of your recovery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li><Link to="/phase-one" className="text-primary hover:underline">Phase 1: Education & Assessment</Link></li>
                      <li><Link to="/phase-two" className="text-primary hover:underline">Phase 2: Exercise Program</Link></li>
                      <li><Link to="/phase-three" className="text-primary hover:underline">Phase 3: Consolidation</Link></li>
                    </ul>
                  </CardContent>
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
                      <li><Link to="/profile" className="text-primary hover:underline">Manage your profile</Link></li>
                      <li><Link to="/policy" className="text-primary hover:underline">Privacy policy & terms</Link></li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Need More Help?
                    </CardTitle>
                    <CardDescription>Get in touch with our support team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <Button onClick={() => setContactOpen(true)} variant="outline">Contact Support</Button>
                  </CardContent>
                </Card>
              </div>
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

      <PageFooter />
    </div>
  );
};

export default Support;
