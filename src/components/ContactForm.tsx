
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, User, MessageSquare, Zap, Star, Rocket } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Message Sent Successfully! 🚀",
      description: "We'll get back to you within 24 hours. Thank you for reaching out to NEXTFANG!",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse white-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-pulse white-glow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 gap-3 card-3d pulse-glow-white text-lg px-8 py-4 animate-fade-in">
            <Mail className="h-5 w-5 animate-pulse" />
            <Star className="h-5 w-5 animate-pulse" />
            Get in Touch
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient white-text-shadow animate-fade-in">
            <span className="inline-block animate-scale-in">Let's</span>{" "}
            <span className="inline-block animate-scale-in" style={{animationDelay: '0.2s'}}>Build</span>{" "}
            <span className="inline-block animate-scale-in" style={{animationDelay: '0.4s'}}>Your</span>
            <br />
            <span className="inline-block animate-scale-in" style={{animationDelay: '0.6s'}}>FANG</span>{" "}
            <span className="inline-block animate-scale-in" style={{animationDelay: '0.8s'}}>Journey</span>{" "}
            <span className="inline-block animate-scale-in" style={{animationDelay: '1s'}}>Together</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed white-text-shadow animate-fade-in" style={{animationDelay: '1.2s'}}>
            Have questions about competitive programming? Need guidance for your FANG preparation? 
            We're here to help you every step of the way!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Information Cards */}
          <div className="space-y-8 animate-fade-in" style={{animationDelay: '1.5s'}}>
            <Card className="card-3d glass-morphism border-2 border-primary/20 white-glow hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-xl white-glow animate-pulse">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg white-text-shadow">Email Us</h3>
                    <p className="text-muted-foreground">Get instant replies</p>
                  </div>
                </div>
                <p className="text-primary font-medium">hello@nextfang.in</p>
                <p className="text-primary font-medium">support@nextfang.in</p>
              </CardContent>
            </Card>

            <Card className="card-3d glass-morphism border-2 border-secondary/20 white-glow hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-gradient-to-r from-secondary to-accent rounded-xl white-glow animate-pulse">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg white-text-shadow">Call Us</h3>
                    <p className="text-muted-foreground">Monday to Friday</p>
                  </div>
                </div>
                <p className="text-secondary font-medium">+91 98765 43210</p>
                <p className="text-secondary font-medium">+91 87654 32109</p>
              </CardContent>
            </Card>

            <Card className="card-3d glass-morphism border-2 border-accent/20 white-glow hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-gradient-to-r from-accent to-primary rounded-xl white-glow animate-pulse">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg white-text-shadow">Visit Us</h3>
                    <p className="text-muted-foreground">India's CP Hub</p>
                  </div>
                </div>
                <p className="text-accent font-medium">Bangalore, India</p>
                <p className="text-accent font-medium">Tech Capital of India</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-fade-in" style={{animationDelay: '1.8s'}}>
            <Card className="card-3d glass-morphism border-2 border-primary/30 white-glow hover:scale-[1.02] transition-transform duration-500">
              <CardHeader className="pb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-xl pulse-3d white-glow">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl text-gradient white-text-shadow animate-scale-in">
                      Send us a Message
                    </CardTitle>
                    <CardDescription className="text-lg mt-2 animate-fade-in">
                      We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="animate-fade-in" style={{animationDelay: '2s'}}>
                            <FormLabel className="flex items-center gap-2 text-base font-medium white-text-shadow">
                              <User className="h-4 w-4 text-primary animate-pulse" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your full name" 
                                {...field}
                                className="h-12 border-2 border-primary/20 focus:border-primary/50 transition-all duration-300 hover:scale-105"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="animate-fade-in" style={{animationDelay: '2.1s'}}>
                            <FormLabel className="flex items-center gap-2 text-base font-medium white-text-shadow">
                              <Mail className="h-4 w-4 text-secondary animate-pulse" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="email"
                                placeholder="Enter your email address" 
                                {...field}
                                className="h-12 border-2 border-secondary/20 focus:border-secondary/50 transition-all duration-300 hover:scale-105"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="animate-fade-in" style={{animationDelay: '2.2s'}}>
                            <FormLabel className="flex items-center gap-2 text-base font-medium white-text-shadow">
                              <Phone className="h-4 w-4 text-accent animate-pulse" />
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                placeholder="Enter your phone number" 
                                {...field}
                                className="h-12 border-2 border-accent/20 focus:border-accent/50 transition-all duration-300 hover:scale-105"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem className="animate-fade-in" style={{animationDelay: '2.3s'}}>
                            <FormLabel className="flex items-center gap-2 text-base font-medium white-text-shadow">
                              <Zap className="h-4 w-4 text-primary animate-pulse" />
                              Subject
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="What's this about?" 
                                {...field}
                                className="h-12 border-2 border-primary/20 focus:border-primary/50 transition-all duration-300 hover:scale-105"
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="animate-fade-in" style={{animationDelay: '2.4s'}}>
                          <FormLabel className="flex items-center gap-2 text-base font-medium white-text-shadow">
                            <MessageSquare className="h-4 w-4 text-secondary animate-pulse" />
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your query or how we can help you..."
                              className="min-h-[150px] border-2 border-secondary/20 focus:border-secondary/50 transition-all duration-300 hover:scale-[1.02]"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-14 text-xl bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent card-3d pulse-glow-white white-glow hover:scale-105 transition-all duration-300 animate-scale-in"
                      style={{animationDelay: '2.5s'}}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-6 w-6 mr-3 animate-pulse" />
                          Send Message
                          <Rocket className="h-6 w-6 ml-3 animate-pulse" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
