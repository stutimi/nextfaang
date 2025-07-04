import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// GFG questions pool (since no public API available)
const gfgQuestions = [
  {
    title: "Find the element that appears once",
    difficulty: "Easy",
    url: "https://practice.geeksforgeeks.org/problems/find-the-element-that-appears-once"
  },
  {
    title: "Count the subarrays",
    difficulty: "Medium",
    url: "https://practice.geeksforgeeks.org/problems/count-the-subarrays"
  },
  {
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    url: "https://practice.geeksforgeeks.org/problems/longest-common-subsequence"
  },
  {
    title: "Binary Tree to DLL",
    difficulty: "Hard",
    url: "https://practice.geeksforgeeks.org/problems/binary-tree-to-dll"
  },
  {
    title: "Maximum path sum",
    difficulty: "Hard",
    url: "https://practice.geeksforgeeks.org/problems/maximum-path-sum"
  },
  {
    title: "Kadane's Algorithm",
    difficulty: "Medium",
    url: "https://practice.geeksforgeeks.org/problems/kadanes-algorithm"
  },
  {
    title: "Rotate Array",
    difficulty: "Easy",
    url: "https://practice.geeksforgeeks.org/problems/rotate-array-by-n-elements"
  },
  {
    title: "Stock buy and sell",
    difficulty: "Medium",
    url: "https://practice.geeksforgeeks.org/problems/stock-buy-and-sell"
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Fetch Codeforces problems
    const cfResponse = await fetch('https://codeforces.com/api/problemset.problems');
    const cfData = await cfResponse.json();
    
    if (cfData.status !== 'OK') {
      throw new Error('Failed to fetch Codeforces problems');
    }

    // Filter problems with rating and contestId
    const problems = cfData.result.problems.filter((p: any) => 
      p.rating && p.contestId && p.rating >= 800 && p.rating <= 2000
    );

    if (problems.length === 0) {
      throw new Error('No suitable Codeforces problems found');
    }

    // Select random Codeforces problem
    const randomCF = problems[Math.floor(Math.random() * problems.length)];
    const cfQuestion = {
      title: randomCF.name,
      difficulty: randomCF.rating.toString(),
      url: `https://codeforces.com/problemset/problem/${randomCF.contestId}/${randomCF.index}`
    };

    // Select random GFG problem
    const gfgQuestion = gfgQuestions[Math.floor(Math.random() * gfgQuestions.length)];

    const response = {
      codeforces: cfQuestion,
      gfg: gfgQuestion
    };

    return new Response(
      JSON.stringify(response),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error fetching random questions:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch random questions',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})