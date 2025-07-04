
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import googleSignImage from "@/assets/google-sign.jpg";
import platformScreenshotImage from "@/assets/platform-screenshot.png";
import appleStoreImage from "@/assets/apple-store.jpg";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your backend
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden futuristic-bg">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0">
        <div className="sparkle-effect w-full h-full"></div>
        
        {/* Background images with 3D effects */}
        <div className="absolute inset-0 opacity-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-10 left-10 w-64 h-48 overflow-hidden holographic-card tilt-3d"
          >
            <img 
              src={googleSignImage} 
              alt="Google Sign"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-10 right-10 w-64 h-48 overflow-hidden holographic-card tilt-3d"
          >
            <img 
              src={platformScreenshotImage} 
              alt="Platform Screenshot"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-48 overflow-hidden holographic-card tilt-3d"
          >
            <img 
              src={appleStoreImage} 
              alt="Apple Store"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Futuristic floating orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-sky-blue/30 to-neon-blue/30 rounded-full blur-3xl animate-floating-3d"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-dark-blue/30 to-light-blue/30 rounded-full blur-3xl animate-floating-3d"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-4 glass-card cyber-border rounded-xl shadow-lg"
            >
              <Mail className="h-10 w-10 neon-text-sky" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold neon-text">
              Get in Touch
            </h2>
          </div>
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            Have questions about <span className="neon-text-sky font-bold">NEXTFAANG</span>? Need help with your CP journey? We're here to help you succeed.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.02}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="glass-card cyber-border hover:scale-105 transition-all duration-500 shadow-2xl">
                <CardHeader className="pb-8">
                  <CardTitle className="text-3xl flex items-center gap-3 neon-text">
                    <MessageSquare className="h-8 w-8 neon-text-sky animate-pulse" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-lg text-foreground/70">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="text-base font-medium mb-3 block neon-text-sky">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="glass-card border-sky-blue/30 focus:border-neon-blue bg-dark-blue/20 h-12 text-lg"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-base font-medium mb-3 block neon-text-sky">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          className="glass-card border-sky-blue/30 focus:border-neon-blue bg-dark-blue/20 h-12 text-lg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="text-base font-medium mb-3 block neon-text-sky">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                        className="glass-card border-sky-blue/30 focus:border-neon-blue bg-dark-blue/20 h-12 text-lg"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="text-base font-medium mb-3 block neon-text-sky">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your question or feedback..."
                        rows={6}
                        required
                        className="glass-card border-sky-blue/30 focus:border-neon-blue bg-dark-blue/20 text-lg"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full futuristic-btn text-xl py-6 gap-3 hover:scale-105 transition-all duration-300"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </div>
                      ) : (
                        <>
                          <Send className="h-6 w-6 animate-bounce" />
                          Send Message 🚀
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Tilt>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.02}>
              <Card className="glass-card cyber-border hover:scale-105 transition-all duration-500 shadow-2xl">
                <CardContent className="pt-10">
                  <h3 className="text-3xl font-bold mb-8 neon-text-sky">Contact Information</h3>
                  <div className="space-y-8">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-start gap-4"
                    >
                      <div className="p-4 glass-card cyber-border rounded-xl">
                        <Mail className="h-8 w-8 neon-text-sky" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-2 text-xl neon-text">Email</h4>
                        <p className="text-lg text-sky-blue font-medium">hello@nextfang.com</p>
                        <p className="text-sm text-foreground/70">We respond within 24 hours</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-start gap-4"
                    >
                      <div className="p-4 glass-card cyber-border rounded-xl">
                        <Clock className="h-8 w-8 neon-text-sky animate-spin" style={{animationDuration: '4s'}} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-2 text-xl neon-text">Response Time</h4>
                        <p className="text-lg text-sky-blue font-medium">Within 24 hours</p>
                        <p className="text-sm text-foreground/70">Usually much faster!</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-start gap-4"
                    >
                      <div className="p-4 glass-card cyber-border rounded-xl">
                        <MessageSquare className="h-8 w-8 neon-text-sky animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-2 text-xl neon-text">Community Support</h4>
                        <p className="text-lg text-sky-blue font-medium">Join our Discord & Telegram</p>
                        <p className="text-sm text-foreground/70">Get instant help from peers</p>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </Tilt>

            <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.02}>
              <Card className="glass-card cyber-border hover:scale-105 transition-all duration-500 shadow-2xl">
                <CardContent className="pt-8">
                  <h4 className="font-bold mb-6 text-2xl neon-text-sky">Quick Links</h4>
                  <div className="space-y-4">
                    <Button 
                      className="w-full justify-start futuristic-btn text-lg py-6 gap-3 hover:scale-105 transition-all duration-300"
                      onClick={() => window.open('https://discord.gg/wNfGqSWD', '_blank')}
                    >
                      <MessageSquare className="h-6 w-6 animate-bounce" />
                      Join Discord Community 🎮
                    </Button>
                    <Button 
                      className="w-full justify-start futuristic-btn text-lg py-6 gap-3 hover:scale-105 transition-all duration-300"
                      onClick={() => window.open('https://t.me/+ESH0q0W9-1A2Nzdl', '_blank')}
                    >
                      <Send className="h-6 w-6 animate-bounce" />
                      Join Telegram Group 📱
                    </Button>
                    <Button 
                      className="w-full justify-start futuristic-btn text-lg py-6 gap-3 hover:scale-105 transition-all duration-300"
                      onClick={() => window.open('https://takeuforward.org/blogs', '_blank')}
                    >
                      <Mail className="h-6 w-6 animate-bounce" />
                      Read Our Blogs 📚
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Tilt>

            <Tilt glareEnable={true} glareMaxOpacity={0.3} scale={1.02}>
              <Card className="glass-card cyber-border hover:scale-105 transition-all duration-500 shadow-2xl">
                <CardContent className="pt-8">
                  <div className="text-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.8 }}
                      className="p-6 glass-card cyber-border rounded-full w-fit mx-auto mb-6"
                    >
                      <Clock className="h-12 w-12 neon-text-sky animate-pulse" />
                    </motion.div>
                    <h4 className="font-bold mb-3 text-2xl neon-text">Fast Response Guarantee</h4>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                      We're committed to helping you succeed. Expect a response within <span className="neon-text-sky font-bold">24 hours</span>! ⚡
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
