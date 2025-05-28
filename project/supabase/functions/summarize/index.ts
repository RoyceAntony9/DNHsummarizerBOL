import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import { load } from 'npm:@tensorflow-models/universal-sentence-encoder@1.3.3';
import { TextRank } from 'npm:@tensorflow/tfjs-node@4.17.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const response = await fetch('https://api.dailynewshighlights.com/country/india/summary', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const text = await response.text();
    const articles = parseArticles(text);
    const summarizedArticles = await summarizeArticles(articles);
    const categorizedArticles = categorizeArticles(summarizedArticles);

    return new Response(
      JSON.stringify(categorizedArticles),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});