import React from 'react';
import { ToolsDropdown } from './navbar/ToolsDropdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

export const DropdownTest = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Dropdown Test Page</h1>

        {/* Simple test dropdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Simple Dropdown Test</CardTitle>
            <p className="text-sm text-muted-foreground">
              Testing basic shadcn/ui dropdown functionality.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Simple Test <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              This should work if shadcn/ui dropdown is properly configured.
            </p>
          </CardContent>
        </Card>

        {/* Tools dropdown test */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tools Dropdown Test</CardTitle>
            <p className="text-sm text-muted-foreground">
              Testing the navbar tools dropdown component in isolation.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <ToolsDropdown />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Click the Tools button above to test the dropdown functionality.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
