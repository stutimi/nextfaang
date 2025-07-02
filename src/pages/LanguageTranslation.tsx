
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Globe, Code, ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";

const LanguageTranslation = () => {
  const [fromLang, setFromLang] = useState("cpp");
  const [toLang, setToLang] = useState("python");
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  const languages = [
    { id: "cpp", name: "C++", color: "bg-blue-100 text-blue-800" },
    { id: "python", name: "Python", color: "bg-green-100 text-green-800" },
    { id: "java", name: "Java", color: "bg-orange-100 text-orange-800" },
    { id: "javascript", name: "JavaScript", color: "bg-yellow-100 text-yellow-800" }
  ];

  const codeExamples = {
    // Binary Search examples
    binarySearch: {
      cpp: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}`,
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1`,
      java: `public static int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}`,
      javascript: `function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    
    return -1;
}`
    },
    // Two Sum examples
    twoSum: {
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    
    return {};
}`,
      python: `def two_sum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return []`,
      java: `public static int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    
    return new int[]{};
}`,
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}`
    },
    // DFS examples
    dfs: {
      cpp: `void dfs(vector<vector<int>>& graph, int node, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
      python: `def dfs(graph, node, visited):
    visited[node] = True
    print(node, end=" ")
    
    for neighbor in graph[node]:
        if not visited[neighbor]:
            dfs(graph, neighbor, visited)`,
      java: `public static void dfs(List<List<Integer>> graph, int node, boolean[] visited) {
    visited[node] = true;
    System.out.print(node + " ");
    
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
      javascript: `function dfs(graph, node, visited) {
    visited[node] = true;
    console.log(node);
    
    for (const neighbor of graph[node]) {
        if (!visited[neighbor]) {
            dfs(graph, neighbor, visited);
        }
    }
}`
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getLanguageColor = (langId: string) => {
    return languages.find(lang => lang.id === langId)?.color || "bg-gray-100 text-gray-800";
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
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Language Translation
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert algorithms between different programming languages
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">From:</label>
              <Select value={fromLang} onValueChange={setFromLang}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">To:</label>
              <Select value={toLang} onValueChange={setToLang}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.id} value={lang.id}>{lang.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {Object.entries(codeExamples).map(([algorithmName, translations]) => (
            <Card key={algorithmName} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl capitalize flex items-center gap-2">
                  <Code className="h-6 w-6" />
                  {algorithmName.replace(/([A-Z])/g, ' $1').trim()}
                </CardTitle>
                <CardDescription>
                  Algorithm implementation comparison across programming languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* From Language */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getLanguageColor(fromLang)}>
                        {languages.find(lang => lang.id === fromLang)?.name}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(translations[fromLang as keyof typeof translations], `${algorithmName}-from`)}
                        className="flex items-center gap-1"
                      >
                        {copiedStates[`${algorithmName}-from`] ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        {copiedStates[`${algorithmName}-from`] ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-slate-100">
                        <code>{translations[fromLang as keyof typeof translations]}</code>
                      </pre>
                    </div>
                  </div>

                  {/* To Language */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getLanguageColor(toLang)}>
                        {languages.find(lang => lang.id === toLang)?.name}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(translations[toLang as keyof typeof translations], `${algorithmName}-to`)}
                        className="flex items-center gap-1"
                      >
                        {copiedStates[`${algorithmName}-to`] ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        {copiedStates[`${algorithmName}-to`] ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm text-slate-100">
                        <code>{translations[toLang as keyof typeof translations]}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl">💡 Translation Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">C++ → Python</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• vector ↔ list</li>
                  <li>• unordered_map ↔ dict</li>
                  <li>• cout ↔ print()</li>
                  <li>• {} ↔ indentation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Java → JavaScript</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• ArrayList ↔ Array</li>
                  <li>• HashMap ↔ Map</li>
                  <li>• System.out.print ↔ console.log</li>
                  <li>• int[] ↔ number[]</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageTranslation;
