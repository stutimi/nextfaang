import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Globe, Code, ArrowLeft, Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

const LanguageTranslation = () => {
  const [fromLang, setFromLang] = useState("cpp");
  const [toLang, setToLang] = useState("python");
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [validationError, setValidationError] = useState<string>("");

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
    },
    // Merge Sort examples
    mergeSort: {
      cpp: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (i = left; i <= right; i++) {
        arr[i] = temp[i - left];
    }
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

public static void merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) temp[k++] = arr[i++];
        else temp[k++] = arr[j++];
    }
    
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (i = left; i <= right; i++) {
        arr[i] = temp[i - left];
    }
}`,
      javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}`
    },
    // Quick Sort examples
    quickSort: {
      cpp: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
      python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`
    },
    // Fibonacci examples
    fibonacci: {
      cpp: `// Recursive approach
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Dynamic Programming approach
int fibonacciDP(int n) {
    if (n <= 1) return n;
    
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
      python: `# Recursive approach
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Dynamic Programming approach
def fibonacci_dp(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]`,
      java: `// Recursive approach
public static int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Dynamic Programming approach
public static int fibonacciDP(int n) {
    if (n <= 1) return n;
    
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
      javascript: `// Recursive approach
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Dynamic Programming approach
function fibonacciDP(n) {
    if (n <= 1) return n;
    
    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`
    },
    // BFS examples
    bfs: {
      cpp: `void bfs(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    queue<int> q;
    
    visited[start] = true;
    q.push(start);
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        cout << node << " ";
        
        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
      python: `from collections import deque

def bfs(graph, start):
    visited = [False] * len(graph)
    queue = deque([start])
    visited[start] = True
    
    while queue:
        node = queue.popleft()
        print(node, end=" ")
        
        for neighbor in graph[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                queue.append(neighbor)`,
      java: `public static void bfs(List<List<Integer>> graph, int start) {
    boolean[] visited = new boolean[graph.size()];
    Queue<Integer> queue = new LinkedList<>();
    
    visited[start] = true;
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        
        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.offer(neighbor);
            }
        }
    }
}`,
      javascript: `function bfs(graph, start) {
    const visited = new Array(graph.length).fill(false);
    const queue = [start];
    visited[start] = true;
    
    while (queue.length > 0) {
        const node = queue.shift();
        console.log(node);
        
        for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        }
    }
}`
    },
    // Dijkstra's Algorithm examples
    dijkstra: {
      cpp: `vector<int> dijkstra(vector<vector<pair<int, int>>>& graph, int start) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    
    dist[start] = 0;
    pq.push({0, start});
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        for (auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second;
            
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}`,
      python: `import heapq

def dijkstra(graph, start):
    n = len(graph)
    dist = [float('inf')] * n
    dist[start] = 0
    pq = [(0, start)]
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if d > dist[u]:
            continue
            
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    
    return dist`,
      java: `public static int[] dijkstra(List<List<int[]>> graph, int start) {
    int n = graph.size();
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    
    dist[start] = 0;
    pq.offer(new int[]{0, start});
    
    while (!pq.isEmpty()) {
        int[] current = pq.poll();
        int d = current[0];
        int u = current[1];
        
        if (d > dist[u]) continue;
        
        for (int[] edge : graph.get(u)) {
            int v = edge[0];
            int weight = edge[1];
            
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    
    return dist;
}`,
      javascript: `function dijkstra(graph, start) {
    const n = graph.length;
    const dist = new Array(n).fill(Infinity);
    const pq = new MinPriorityQueue();
    
    dist[start] = 0;
    pq.enqueue(start, 0);
    
    while (!pq.isEmpty()) {
        const { element: u, priority: d } = pq.dequeue();
        
        if (d > dist[u]) continue;
        
        for (const [v, weight] of graph[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.enqueue(v, dist[v]);
            }
        }
    }
    
    return dist;
}`
    },
    // Longest Common Subsequence (LCS) examples
    lcs: {
      cpp: `int lcs(string text1, string text2) {
    int m = text1.length(), n = text2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}`,
      python: `def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    return dp[m][n]`,
      java: `public static int lcs(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}`,
      javascript: `function lcs(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    return dp[m][n];
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

  const validateLanguageSelection = (from: string, to: string) => {
    if (!from || !to) {
      setValidationError("Please select both source and target languages.");
      return false;
    }
    if (from === to) {
      setValidationError("Source and target languages cannot be the same. Please select different languages.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleFromLangChange = (value: string) => {
    setFromLang(value);
    validateLanguageSelection(value, toLang);
  };

  const handleToLangChange = (value: string) => {
    setToLang(value);
    validateLanguageSelection(fromLang, value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
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
                Algorithm Comparison
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare algorithm implementations across different programming languages
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">From:</label>
              <Select value={fromLang} onValueChange={handleFromLangChange}>
                <SelectTrigger className={`w-32 ${validationError ? 'border-red-500' : ''}`}>
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
              <Select value={toLang} onValueChange={handleToLangChange}>
                <SelectTrigger className={`w-32 ${validationError ? 'border-red-500' : ''}`}>
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

          {validationError && (
            <div className="flex justify-center mb-6">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg max-w-md text-center">
                <p className="text-sm font-medium">{validationError}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg">
            <Code className="h-4 w-4" />
            <span className="text-sm font-medium">
              {Object.keys(codeExamples).length} algorithms available � {languages.length} languages supported � {Object.keys(codeExamples).length * languages.length} total examples
            </span>
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

        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-xl">ℹ️ About This Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This tool shows equivalent algorithm implementations across different programming languages. 
              These are hand-crafted examples that demonstrate how the same algorithmic concepts are 
              expressed in different languages, rather than automatic code translation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageTranslation;