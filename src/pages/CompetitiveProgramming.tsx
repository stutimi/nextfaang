import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Code,
    Trophy,
    Target,
    BookOpen,
    Users,
    Clock,
    Star,
    ExternalLink,
    Zap,
    Brain,
    Award,
    TrendingUp,
    Rocket,
    Sword,
    ChevronRight,
    History
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { FloatingActionButton } from "@/components/FloatingActionButton";

const CompetitiveProgramming = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const legends = [
        {
            rank: "#1",
            name: "Gennady \"tourist\" Korotkevich",
            description: "The most successful competitive programmer of all time. World Champion in ACM ICPC and TopCoder Open. Multiple-time winner at Google Code Jam.",
            country: "BY",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            rank: "#2",
            name: "Petr Mitrichev",
            description: "Legendary competitive programmer, former at Google. Open Internet, Senior Algorithmic Engineer at Facebook.",
            country: "RU",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
            rank: "#3",
            name: "Benq (Benjamin Qi)",
            description: "Dominant on platforms like Codeforces and AtCoder. National Olympiad in Informatics winner and Software Engineer at Facebook.",
            country: "JP",
            avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
        },
        {
            rank: "#4",
            name: "Errichto (Kamil Debowski)",
            description: "Popular competitive programming YouTuber and ACM ICPC World Finals participant. Creates educational content for CP community.",
            country: "PL",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
        },
        {
            rank: "#5",
            name: "rng_58 (Petr Evdakov)",
            description: "Top competitive programmer, frequent contest winner. Active in algorithmic research and competitive programming community.",
            country: "JP",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        }
    ];

    const currentProblems = [
        "No clear roadmap from beginner to advanced levels",
        "Scattered tutorials and inconsistent teaching methods",
        "Students struggle alone without proper mentorship",
        "Traditional approaches don't match modern CP requirements"
    ];

    const nextfaangSolutions = [
        {
            title: "Complete A2Z Roadmap",
            description: "Structured learning path from basics to IOI level"
        },
        {
            title: "Expert-Curated Content",
            description: "High-quality resources created by CP champions"
        },
        {
            title: "Active Community",
            description: "24/7 support through Discord, Telegram, and mentorship"
        },
        {
            title: "Modern AI-Powered Tools",
            description: "Personalized learning with AI guidance and analytics"
        }
    ];

    const platforms = [
        {
            name: "Codeforces",
            description: "Most popular competitive programming platform",
            url: "https://codeforces.com",
            difficulty: "Beginner to Expert",
            features: ["Regular contests", "Problem archive", "Rating system"]
        },
        {
            name: "AtCoder",
            description: "Japanese platform with high-quality problems",
            url: "https://atcoder.jp",
            difficulty: "Beginner to Expert",
            features: ["Weekly contests", "Educational content", "Clean interface"]
        },
        {
            name: "CodeChef",
            description: "Indian platform with diverse contest formats",
            url: "https://codechef.com",
            difficulty: "Beginner to Expert",
            features: ["Long challenges", "Cook-offs", "Lunchtime contests"]
        },
        {
            name: "LeetCode",
            description: "Interview preparation focused platform",
            url: "https://leetcode.com",
            difficulty: "Easy to Hard",
            features: ["Interview questions", "Company tags", "Mock interviews"]
        }
    ];

    const topics = [
        {
            category: "Fundamentals",
            items: [
                "Time & Space Complexity",
                "Basic Data Structures",
                "Sorting & Searching",
                "Two Pointers",
                "Sliding Window"
            ]
        },
        {
            category: "Advanced Data Structures",
            items: [
                "Segment Trees",
                "Fenwick Trees",
                "Disjoint Set Union",
                "Trie",
                "Heavy-Light Decomposition"
            ]
        },
        {
            category: "Algorithms",
            items: [
                "Dynamic Programming",
                "Graph Algorithms",
                "String Algorithms",
                "Number Theory",
                "Computational Geometry"
            ]
        },
        {
            category: "Advanced Topics",
            items: [
                "Flow Networks",
                "Linear Algebra",
                "Game Theory",
                "Probability",
                "Advanced DP Techniques"
            ]
        }
    ];

    const tools = [
        {
            name: "CP Arena",
            description: "Compete in real-time coding battles",
            href: "/cp-arena",
            icon: <Sword className="h-5 w-5" />,
            badge: "New"
        },
        {
            name: "Contest Analyzer",
            description: "Analyze your contest performance",
            href: "/contest-analyzer",
            icon: <TrendingUp className="h-5 w-5" />,
            badge: null
        },
        {
            name: "CP Dictionary",
            description: "Learn competitive programming terms",
            href: "/cp-dictionary",
            icon: <BookOpen className="h-5 w-5" />,
            badge: null
        },
        {
            name: "Tricks & Tips",
            description: "Master advanced techniques",
            href: "/cp-tricks-tips",
            icon: <Zap className="h-5 w-5" />,
            badge: "Hot"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            <Code className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Competitive Programming
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                        Master the art of algorithmic problem-solving and compete with programmers worldwide.
                        Build your skills, climb the rankings, and prepare for technical interviews.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Trophy className="h-4 w-4 mr-2" />
                            Competitive Programming
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Target className="h-4 w-4 mr-2" />
                            Problem Solving
                        </Badge>
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            <Brain className="h-4 w-4 mr-2" />
                            Algorithmic Thinking
                        </Badge>
                    </div>
                </motion.div>

                {/* Navigation Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="platforms">Platforms</TabsTrigger>
                        <TabsTrigger value="topics">Topics</TabsTrigger>
                        <TabsTrigger value="tools">Tools</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="card-3d border-2 border-primary/20">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <Trophy className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <CardTitle>What is CP?</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Competitive Programming is a sport where programmers solve algorithmic problems
                                        within time limits, testing problem-solving skills and coding efficiency.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="card-3d border-2 border-green-500/20">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/10 rounded-lg">
                                            <Target className="h-6 w-6 text-green-500" />
                                        </div>
                                        <CardTitle>Why CP?</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="text-muted-foreground space-y-2">
                                        <li>• Improve problem-solving skills</li>
                                        <li>• Prepare for technical interviews</li>
                                        <li>• Build algorithmic thinking</li>
                                        <li>• Join global community</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="card-3d border-2 border-purple-500/20">
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                            <Rocket className="h-6 w-6 text-purple-500" />
                                        </div>
                                        <CardTitle>Getting Started</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="text-muted-foreground space-y-2">
                                        <li>• Choose a programming language</li>
                                        <li>• Start with basic problems</li>
                                        <li>• Practice regularly</li>
                                        <li>• Participate in contests</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl">
                                <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                                <div className="text-sm text-muted-foreground">Active Programmers</div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl">
                                <div className="text-3xl font-bold text-secondary mb-2">10K+</div>
                                <div className="text-sm text-muted-foreground">Problems Available</div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl">
                                <div className="text-3xl font-bold text-accent mb-2">500+</div>
                                <div className="text-sm text-muted-foreground">Contests Monthly</div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl">
                                <div className="text-3xl font-bold text-green-500 mb-2">24/7</div>
                                <div className="text-sm text-muted-foreground">Practice Available</div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Platforms Tab */}
                    <TabsContent value="platforms" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {platforms.map((platform, index) => (
                                <motion.div
                                    key={platform.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="card-3d border-2 border-primary/20 h-full">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-xl">{platform.name}</CardTitle>
                                                <Badge variant="outline">{platform.difficulty}</Badge>
                                            </div>
                                            <CardDescription>{platform.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold mb-2">Features:</h4>
                                                <ul className="text-sm text-muted-foreground space-y-1">
                                                    {platform.features.map((feature, idx) => (
                                                        <li key={idx}>• {feature}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Button asChild className="w-full">
                                                <a href={platform.url} target="_blank" rel="noopener noreferrer">
                                                    Visit Platform
                                                    <ExternalLink className="h-4 w-4 ml-2" />
                                                </a>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Topics Tab */}
                    <TabsContent value="topics" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {topics.map((topic, index) => (
                                <motion.div
                                    key={topic.category}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="card-3d border-2 border-primary/20">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <BookOpen className="h-5 w-5 text-primary" />
                                                {topic.category}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-2">
                                                {topic.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                                                        <ChevronRight className="h-4 w-4 text-primary" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* Tools Tab */}
                    <TabsContent value="tools" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {tools.map((tool, index) => (
                                <motion.div
                                    key={tool.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="card-3d border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-primary/10 rounded-lg">
                                                        {tool.icon}
                                                    </div>
                                                    <CardTitle>{tool.name}</CardTitle>
                                                </div>
                                                {tool.badge && (
                                                    <Badge
                                                        variant="secondary"
                                                        className={
                                                            tool.badge === 'New'
                                                                ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                                : 'bg-red-500/20 text-red-400 border-red-500/30'
                                                        }
                                                    >
                                                        {tool.badge}
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardDescription>{tool.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Button asChild className="w-full">
                                                <Link to={tool.href}>
                                                    Explore Tool
                                                    <ChevronRight className="h-4 w-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Origins & Evolution of Competitive Programming */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-16"
                >
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <Clock className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Origins & Evolution of Competitive Programming
                            </h2>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            From 1970s ACM ICPC to modern global CP platforms
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* 1970s-1980s */}
                        <Card className="card-3d border-2 border-primary/20">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Clock className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <CardTitle>1970s-1980s</CardTitle>
                                </div>
                                <CardDescription>The Birth</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    ACM ICPC (1970) started at Texas A&M, grew international by 1980s using Pascal, Fortran, and C.
                                </p>
                            </CardContent>
                        </Card>

                        {/* 1990s */}
                        <Card className="card-3d border-2 border-primary/20">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Clock className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <CardTitle>1990s</CardTitle>
                                </div>
                                <CardDescription>Academic Growth</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    ICPC became prestigious, top universities started training teams, early online judges appeared (PKU, UVa).
                                </p>
                            </CardContent>
                        </Card>

                        {/* 2000s */}
                        <Card className="card-3d border-2 border-primary/20">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Clock className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <CardTitle>2000s</CardTitle>
                                </div>
                                <CardDescription>Online Revolution</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    TopCoder (2001), Codeforces (2009), CodeChef (2009) revolutionized CP with online contests and rating systems.
                                </p>
                            </CardContent>
                        </Card>

                        {/* 2010s-2020s */}
                        <Card className="card-3d border-2 border-primary/20">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg">
                                        <Clock className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <CardTitle>2010s-2020s</CardTitle>
                                </div>
                                <CardDescription>Globalization</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Google Code Jam, Facebook Hacker Cup, educational content, and global participation explosion.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                {/* CP Legends Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-16"
                >
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <Trophy className="h-8 w-8 text-primary" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Competitive Programming Legends
                            </h2>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Learn from the greatest competitive programmers who have shaped the CP world
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {legends.map((legend, index) => (
                            <motion.div
                                key={legend.rank}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="card-3d border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 h-full">
                                    <CardHeader className="text-center">
                                        <div className="flex items-center justify-between mb-4">
                                            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                                <Star className="h-3 w-3 mr-1" />
                                                {legend.rank}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                                {legend.country}
                                            </Badge>
                                        </div>
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                                            <img
                                                src={legend.avatar}
                                                alt={legend.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <CardTitle className="text-lg">{legend.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground text-center mb-4">
                                            {legend.description}
                                        </p>
                                        <Button variant="outline" className="w-full" size="sm">
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Read Article
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Indian CP Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-16"
                >
                    <Card className="card-3d border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                        <CardHeader className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="p-3 bg-green-500/10 rounded-2xl">
                                    <Target className="h-8 w-8 text-green-500" />
                                </div>
                                <CardTitle className="text-3xl md:text-4xl font-bold">
                                    Indian CP: Current State & Future Vision
                                </CardTitle>
                            </div>
                            <CardDescription className="text-lg">
                                Transforming India's competitive programming landscape with NEXTFAANG
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Current Problems */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-6 text-red-400 flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Current Problems
                                    </h3>
                                    <div className="space-y-4">
                                        {currentProblems.map((problem, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 + index * 0.1 }}
                                                className="flex items-start gap-3 p-4 bg-red-500/10 rounded-lg border border-red-500/20"
                                            >
                                                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                                                <p className="text-sm text-muted-foreground">{problem}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* NEXTFAANG Solutions */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-6 text-green-400 flex items-center gap-2">
                                        <Rocket className="h-5 w-5" />
                                        NEXTFAANG Solutions
                                    </h3>
                                    <div className="space-y-4">
                                        {nextfaangSolutions.map((solution, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 + index * 0.1 }}
                                                className="p-4 bg-green-500/10 rounded-lg border border-green-500/20"
                                            >
                                                <h4 className="font-semibold text-green-400 mb-2">{solution.title}</h4>
                                                <p className="text-sm text-muted-foreground">{solution.description}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Ready to Become CP Legend CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 mb-12"
                >
                    <div className="flex items-center justify-center mb-6">
                        <div className="p-4 bg-primary/10 rounded-2xl">
                            <Trophy className="h-12 w-12 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Ready to Become a CP Legend?</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                        Join thousands of aspiring competitive programmers on their journey to greatness. Master
                        algorithms, solve challenging problems, and compete with the best!
                    </p>
                    <Button size="lg" className="px-8 py-4 text-lg">
                        <Rocket className="h-5 w-5 mr-2" />
                        Start Your CP Journey
                    </Button>
                </motion.div>

                {/* Quick Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <Button asChild size="lg" className="px-8">
                        <Link to="/cp-arena">
                            <Sword className="h-5 w-5 mr-2" />
                            Start Competing
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="px-8">
                        <Link to="/resources">
                            <BookOpen className="h-5 w-5 mr-2" />
                            View Resources
                        </Link>
                    </Button>
                </motion.div>
            </div>

            {/* Enhanced UI Components */}
            <FloatingActionButton />
        </div>
    );
};

export default CompetitiveProgramming;