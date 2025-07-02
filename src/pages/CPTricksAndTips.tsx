
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Code, Clock, Target, ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";

const CPTricksAndTips = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tricksAndTips = [
    {
      title: "Fast I/O in C++",
      category: "optimization",
      difficulty: "Easy",
      description: "Speed up input/output operations for large datasets",
      content: `// Add these lines at the beginning of main()
ios_base::sync_with_stdio(false);
cin.tie(NULL);
cout.tie(NULL);

// This can reduce execution time significantly in problems with large input`,
      impact: "High",
      timeToLearn: "5 minutes"
    },
    {
      title: "Binary Search Template",
      category: "algorithms",
      difficulty: "Medium",
      description: "A foolproof binary search template that works every time",
      content: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1; // Not found
}`,
      impact: "Medium",
      timeToLearn: "15 minutes"
    },
    {
      title: "Prefix Sum Technique",
      category: "techniques",
      difficulty: "Easy",
      description: "Calculate range sums in O(1) time after O(n) preprocessing",
      content: `// Build prefix sum array
vector<int> prefixSum(n + 1, 0);
for (int i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + arr[i];
}

// Query sum from index l to r (inclusive)
int rangeSum = prefixSum[r + 1] - prefixSum[l];`,
      impact: "High",
      timeToLearn: "10 minutes"
    },
    {
      title: "Two Pointers for Pair Sum",
      category: "techniques",
      difficulty: "Easy",
      description: "Find pairs with given sum in sorted array efficiently",
      content: `bool findPairSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    
    return false;
}`,
      impact: "Medium",
      timeToLearn: "10 minutes"
    },
    {
      title: "Sliding Window Maximum",
      category: "techniques",
      difficulty: "Hard",
      description: "Find maximum in every window of size k using deque",
      content: `vector<int> slidingWindowMaximum(vector<int>& arr, int k) {
    deque<int> dq; // Store indices
    vector<int> result;
    
    for (int i = 0; i < arr.size(); i++) {
        // Remove elements outside window
        while (!dq.empty() && dq.front() <= i - k) {
            dq.pop_front();
        }
        
        // Remove smaller elements
        while (!dq.empty() && arr[dq.back()] <= arr[i]) {
            dq.pop_back();
        }
        
        dq.push_back(i);
        
        if (i >= k - 1) {
            result.push_back(arr[dq.front()]);
        }
    }
    
    return result;
}`,
      impact: "High",
      timeToLearn: "30 minutes"
    },
    {
      title: "Contest Strategy Tips",
      category: "strategy",
      difficulty: "Easy",
      description: "Time management and problem-solving strategies for contests",
      content: `1. Read ALL problems first (5-10 minutes)
2. Solve problems in order of difficulty for you, not given order
3. If stuck for 15+ minutes, move to next problem
4. Always test with edge cases: empty input, single element, maximum constraints
5. Code simple solutions first, optimize later if needed
6. Use meaningful variable names even in contests
7. Keep templates ready for common algorithms`,
      impact: "High",
      timeToLearn: "Practice needed"
    },
    {
      title: "Avoiding Integer Overflow",
      category: "optimization",
      difficulty: "Medium",
      description: "Prevent overflow errors in calculations",
      content: `// Use long long for large numbers
typedef long long ll;

// Check for overflow before multiplication
bool willOverflow(ll a, ll b) {
    return a > LLONG_MAX / b;
}

// Modular arithmetic to prevent overflow
const int MOD = 1e9 + 7;
ll result = (a * b) % MOD;

// Safe addition with modulo
ll safeAdd(ll a, ll b, ll mod) {
    return ((a % mod) + (b % mod)) % mod;
}`,
      impact: "High",
      timeToLearn: "15 minutes"
    },
    {
      title: "STL Tricks",
      category: "optimization",
      difficulty: "Easy",
      description: "Useful STL functions that save time and code",
      content: `// Sort and remove duplicates
sort(vec.begin(), vec.end());
vec.erase(unique(vec.begin(), vec.end()), vec.end());

// Find next greater element
auto it = upper_bound(vec.begin(), vec.end(), target);

// Check if element exists
bool exists = binary_search(vec.begin(), vec.end(), target);

// Rotate array
rotate(vec.begin(), vec.begin() + k, vec.end());

// Reverse range
reverse(vec.begin() + l, vec.begin() + r + 1);`,
      impact: "Medium",
      timeToLearn: "20 minutes"
    }
  ];

  const categories = [
    { id: "all", name: "All Tips", icon: Star },
    { id: "algorithms", name: "Algorithms", icon: Code },
    { id: "techniques", name: "Techniques", icon: Target },
    { id: "optimization", name: "Optimization", icon: Clock },
    { id: "strategy", name: "Strategy", icon: Lightbulb }
  ];

  const filteredTips = selectedCategory === "all" 
    ? tricksAndTips 
    : tricksAndTips.filter(tip => tip.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
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
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <Lightbulb className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                CP Tricks & Tips
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Master competitive programming with these proven techniques and strategies
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTips.map((tip, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge className={getDifficultyColor(tip.difficulty)}>
                      {tip.difficulty}
                    </Badge>
                    <Badge className={getImpactColor(tip.impact)}>
                      {tip.impact} Impact
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {tip.description}
                </CardDescription>
                <div className="text-sm text-muted-foreground">
                  ⏱️ Time to learn: {tip.timeToLearn}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-100 whitespace-pre-wrap">
                    <code>{tip.content}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CPTricksAndTips;
