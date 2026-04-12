#!/bin/bash

# Marvox Documentation Deployment Script

set -e

echo "🚀 Deploying Marvox Documentation..."

# Build the documentation site
echo "📦 Building documentation site..."
npm run build

# Deploy to Vercel (subdomain)
if [ "$1" = "vercel" ]; then
    echo "🌐 Deploying to Vercel..."
    vercel --prod --alias docs.marvox.com
    echo "✅ Deployed to https://docs.marvox.com"

# Deploy to Netlify
elif [ "$1" = "netlify" ]; then
    echo "🌐 Deploying to Netlify..."
    netlify deploy --prod --dir=.next --alias docs.marvox.com
    echo "✅ Deployed to https://docs.marvox.com"

# Deploy to custom server
elif [ "$1" = "custom" ]; then
    echo "🌐 Deploying to custom server..."
    rsync -avz .next/ user@server:/var/www/docs.marvox.com/
    echo "✅ Deployed to custom server"

else
    echo "❌ Please specify deployment target: vercel, netlify, or custom"
    exit 1
fi

echo "🎉 Documentation deployment complete!"
