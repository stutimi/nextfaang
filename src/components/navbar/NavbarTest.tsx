import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

export const NavbarTest = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    // Test 1: Check if navbar elements exist
    try {
      const navbar = document.querySelector('nav');
      results.push({
        name: 'Navbar Element',
        status: navbar ? 'pass' : 'fail',
        message: navbar ? 'Navbar element found' : 'Navbar element not found'
      });
    } catch (error) {
      results.push({
        name: 'Navbar Element',
        status: 'fail',
        message: `Error checking navbar: ${error}`
      });
    }

    // Test 2: Check mobile menu button
    try {
      const menuButton = document.querySelector('[aria-label*="menu"]');
      results.push({
        name: 'Mobile Menu Button',
        status: menuButton ? 'pass' : 'fail',
        message: menuButton ? 'Mobile menu button found' : 'Mobile menu button not found'
      });
    } catch (error) {
      results.push({
        name: 'Mobile Menu Button',
        status: 'fail',
        message: `Error checking menu button: ${error}`
      });
    }

    // Test 3: Check bottom navigation
    try {
      const bottomNav = document.querySelector('.fixed.bottom-0');
      results.push({
        name: 'Bottom Navigation',
        status: bottomNav ? 'pass' : 'warning',
        message: bottomNav ? 'Bottom navigation found' : 'Bottom navigation not found (may be hidden on desktop)'
      });
    } catch (error) {
      results.push({
        name: 'Bottom Navigation',
        status: 'fail',
        message: `Error checking bottom nav: ${error}`
      });
    }

    // Test 4: Check navigation links
    try {
      const navLinks = document.querySelectorAll('a[href*="/dsa"], a[href*="/system-design"]');
      results.push({
        name: 'Navigation Links',
        status: navLinks.length > 0 ? 'pass' : 'fail',
        message: `Found ${navLinks.length} navigation links`
      });
    } catch (error) {
      results.push({
        name: 'Navigation Links',
        status: 'fail',
        message: `Error checking nav links: ${error}`
      });
    }

    // Test 5: Check touch event support
    try {
      const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      results.push({
        name: 'Touch Support',
        status: hasTouchSupport ? 'pass' : 'warning',
        message: hasTouchSupport ? 'Touch events supported' : 'Touch events not supported (desktop device)'
      });
    } catch (error) {
      results.push({
        name: 'Touch Support',
        status: 'fail',
        message: `Error checking touch support: ${error}`
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  useEffect(() => {
    // Auto-run tests on component mount
    const timer = setTimeout(runTests, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      pass: 'bg-green-100 text-green-800',
      fail: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800'
    };

    return (
      <Badge className={variants[status]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Navbar Functionality Test
          <Button 
            onClick={runTests} 
            disabled={isRunning}
            size="sm"
            variant="outline"
          >
            {isRunning ? 'Running...' : 'Run Tests'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {testResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(result.status)}
                <div>
                  <div className="font-medium">{result.name}</div>
                  <div className="text-sm text-muted-foreground">{result.message}</div>
                </div>
              </div>
              {getStatusBadge(result.status)}
            </div>
          ))}
          
          {testResults.length === 0 && !isRunning && (
            <div className="text-center text-muted-foreground py-8">
              Click "Run Tests" to check navbar functionality
            </div>
          )}
          
          {isRunning && (
            <div className="text-center text-muted-foreground py-8">
              Running tests...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
