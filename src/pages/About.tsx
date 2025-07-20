import { ContactSection } from "@/components/ContactSection";
import { Navbar } from "@/components/Navbar";
import { FutureScope } from "@/components/FutureScope";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        {/* About Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
                About NEXTFAANG
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Empowering the next generation of competitive programmers to achieve their dreams
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  NEXTFAANG is dedicated to creating India's first Legendary Grandmaster (LGM) in competitive programming. 
                  We provide comprehensive resources, tools, and community support to help aspiring programmers excel in 
                  competitive programming and secure positions at top tech companies.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our platform combines cutting-edge technology with proven methodologies to deliver an unparalleled 
                  learning experience for competitive programmers at all levels.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-semibold mb-4">What We Offer</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Comprehensive DSA learning paths
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Real-time competitive programming arena
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    AI-powered contest analysis
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    System design mastery courses
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    FAANG interview preparation
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Active community support
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  description: "We strive for the highest standards in everything we create and deliver.",
                  icon: "🏆"
                },
                {
                  title: "Innovation",
                  description: "We continuously push boundaries to create cutting-edge learning experiences.",
                  icon: "🚀"
                },
                {
                  title: "Community",
                  description: "We believe in the power of collaborative learning and mutual support.",
                  icon: "🤝"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-background border border-border/50"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <FutureScope />
        {/* Contact Section */}
        <ContactSection />
      </main>
    </div>
  );
};

export default About;
