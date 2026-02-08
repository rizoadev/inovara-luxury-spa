#!/bin/bash

echo "🏗️ Building project..."
npm run build

echo "🚀 Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=luxury-spa-landing

echo "✅ Deployment complete!"
