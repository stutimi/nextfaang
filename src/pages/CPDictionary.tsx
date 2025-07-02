
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Code, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CPDictionary = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const cpTerms = [
    {
      term: "Dynamic Programming (DP)",
      definition: "A method for solving complex problems by breaking them down into simpler subproblems and storing results to avoid redundant calculations.",
      example: "Fibonacci sequence, Longest Common Subsequence",
      difficulty: "Medium",
      category: "Algorithm"
    },
    {
      term: "Two Pointers",
      definition: "A technique using two pointers to traverse data structures, often from opposite ends or at different speeds.",
      example: "Finding pair sum in sorted array, Palindrome check",
      difficulty: "Easy",
      category: "Technique"
    },
    {
      term: "Binary Search",
      definition: "A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
      example: "Finding element in sorted array, Square root calculation",
      difficulty: "Easy",
      category: "Algorithm"
    },
    {
      term: "Greedy Algorithm",
      definition: "An algorithmic paradigm that makes the locally optimal choice at each stage, hoping to find a global optimum.",
      example: "Activity Selection, Huffman Coding",
      difficulty: "Medium",
      category: "Algorithm"
    },
    {
      term: "Graph Traversal",
      definition: "Methods to visit all vertices in a graph systematically, commonly using BFS (Breadth-First Search) or DFS (Depth-First Search).",
      example: "Finding connected components, Shortest path",
      difficulty: "Medium",
      category: "Algorithm"
    },
    {
      term: "Sliding Window",
      definition: "A technique to find optimal solutions by maintaining a window of elements and sliding it across the data structure.",
      example: "Maximum sum subarray of size k, Longest substring without repeating characters",
      difficulty: "Medium",
      category: "Technique"
    },
    {
      term: "Time Complexity",
      definition: "A measure of the computational time an algorithm takes as a function of the input size, expressed in Big O notation.",
      example: "O(1), O(log n), O(n), O(n²)",
      difficulty: "Easy",
      category: "Concept"
    },
    {
      term: "Space Complexity",
      definition: "A measure of the amount of memory space an algorithm uses as a function of the input size.",
      example: "O(1) space, O(n) space for recursion stack",
      difficulty: "Easy",
      category: "Concept"
    }
  ];

  const filteredTerms = cpTerms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Algorithm": return "bg-blue-100 text-blue-800";
      case "Technique": return "bg-purple-100 text-purple-800";
      case "Concept": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CP Dictionary
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your comprehensive guide to competitive programming terms and concepts
            </p>
          </div>

          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search terms, definitions, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl">{item.term}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                    <Badge className={getCategoryColor(item.category)}>
                      {item.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 leading-relaxed">
                  {item.definition}
                </CardDescription>
                <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-blue-500">
                  <div className="text-sm font-medium text-blue-800 mb-1">Example:</div>
                  <div className="text-sm text-slate-700">{item.example}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No terms found</h3>
            <p className="text-muted-foreground">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CPDictionary;
