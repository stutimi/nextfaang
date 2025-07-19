import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Play, 
  Save, 
  CheckCircle, 
  XCircle, 
  Terminal, 
  Zap,
  Settings,
  Copy,
  Download,
  RefreshCw
} from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onRun?: (code: string, language: string) => void;
  onSubmit?: (code: string, language: string) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
  output?: string;
}

const LANGUAGES = [
  { id: "python", name: "Python", extension: ".py" },
  { id: "cpp", name: "C++", extension: ".cpp" },
  { id: "java", name: "Java", extension: ".java" },
  { id: "javascript", name: "JavaScript", extension: ".js" },
  { id: "typescript", name: "TypeScript", extension: ".ts" }
];

const THEMES = [
  { id: "vs-dark", name: "Dark" },
  { id: "vs-light", name: "Light" }
];

const SNIPPETS = {
  python: `def solve(nums):\n    # Your solution here\n    return sum(nums)\n\n# Test your solution\nprint(solve([1, 2, 3, 4, 5]))`,
  cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint solve(vector<int>& nums) {\n    // Your solution here\n    return 0;\n}\n\nint main() {\n    vector<int> nums = {1, 2, 3, 4, 5};\n    cout << solve(nums) << endl;\n    return 0;\n}`,
  java: `import java.util.*;\n\npublic class Solution {\n    public static int solve(int[] nums) {\n        // Your solution here\n        return 0;\n    }\n    \n    public static void main(String[] args) {\n        int[] nums = {1, 2, 3, 4, 5};\n        System.out.println(solve(nums));\n    }\n}`,
  javascript: `function solve(nums) {\n    // Your solution here\n    return nums.reduce((a, b) => a + b, 0);\n}\n\n// Test your solution\nconsole.log(solve([1, 2, 3, 4, 5]));`,
  typescript: `function solve(nums: number[]): number {\n    // Your solution here\n    return nums.reduce((a, b) => a + b, 0);\n}\n\n// Test your solution\nconsole.log(solve([1, 2, 3, 4, 5]));`
};

export const CodeEditor = ({
  initialCode = "",
  language = "python",
  onRun,
  onSubmit,
  readOnly = false,
  theme = 'dark',
  output = ""
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode || SNIPPETS[language as keyof typeof SNIPPETS]);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [editorTheme, setEditorTheme] = useState(theme === 'dark' ? 'vs-dark' : 'vs-light');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'output'>('editor');
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  
  // Load Monaco Editor dynamically
  useEffect(() => {
    // This would normally load Monaco Editor
    // For this demo, we'll simulate it
    const timer = setTimeout(() => {
      setEditorLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle language change
  useEffect(() => {
    if (code === initialCode || code === SNIPPETS[language as keyof typeof SNIPPETS]) {
      setCode(SNIPPETS[selectedLanguage as keyof typeof SNIPPETS] || "");
    }
  }, [selectedLanguage, initialCode, language]);
  
  const handleRun = () => {
    if (!code.trim() || !onRun) return;
    
    setIsRunning(true);
    setActiveTab('output');
    
    // Simulate running code
    setTimeout(() => {
      onRun(code, selectedLanguage);
      setIsRunning(false);
    }, 1500);
  };
  
  const handleSubmit = () => {
    if (!code.trim() || !onSubmit) return;
    
    setIsSubmitting(true);
    setActiveTab('output');
    
    // Simulate submitting code
    setTimeout(() => {
      onSubmit(code, selectedLanguage);
      setIsSubmitting(false);
    }, 2000);
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };
  
  const handleDownloadCode = () => {
    const extension = LANGUAGES.find(lang => lang.id === selectedLanguage)?.extension || '.txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solution${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const getLanguageIcon = (langId: string) => {
    switch (langId) {
      case 'python': return '🐍';
      case 'cpp': return 'C++';
      case 'java': return '☕';
      case 'javascript': return 'JS';
      case 'typescript': return 'TS';
      default: return '📄';
    }
  };
  
  return (
    <Card className="magical-glow h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Code Editor
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    <div className="flex items-center gap-2">
                      <span>{getLanguageIcon(lang.id)}</span>
                      <span>{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={editorTheme} onValueChange={setEditorTheme}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {THEMES.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'editor' | 'output')}>
          <div className="flex items-center justify-between px-6 pt-2">
            <TabsList>
              <TabsTrigger value="editor" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="output" className="flex items-center gap-1">
                <Terminal className="h-4 w-4" />
                Output
                {output && <Badge variant="outline" className="ml-1 h-4 w-4 p-0 flex items-center justify-center">!</Badge>}
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleCopyCode} title="Copy Code">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleDownloadCode} title="Download Code">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Editor Settings">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="editor" className="m-0">
            <div className="border-t border-border mt-2">
              {!editorLoaded ? (
                <div className="h-[400px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                    <span>Loading editor...</span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm p-4 h-[400px] w-full resize-none bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Write your code here..."
                    readOnly={readOnly}
                    spellCheck={false}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-primary/10">
                      {getLanguageIcon(selectedLanguage)} {selectedLanguage}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="output" className="m-0">
            <div className="border-t border-border mt-2">
              <div className="h-[400px] overflow-auto p-4 font-mono text-sm bg-muted/20">
                {output ? (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="text-muted-foreground text-center py-12">
                    Run your code to see output here
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {readOnly ? (
              <Badge variant="outline">Read Only</Badge>
            ) : (
              <span>{code.length} characters</span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {onRun && (
              <Button
                variant="outline"
                onClick={handleRun}
                disabled={isRunning || isSubmitting || !code.trim()}
              >
                {isRunning ? (
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Run
              </Button>
            )}
            
            {onSubmit && (
              <Button
                onClick={handleSubmit}
                disabled={isRunning || isSubmitting || !code.trim()}
              >
                {isSubmitting ? (
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Submit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};