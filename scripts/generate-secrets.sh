#!/bin/bash

# Script to generate secure secrets for production

echo "🔐 Generating Secure Secrets for Production"
echo "==========================================="
echo ""

echo "JWT_SECRET=$(openssl rand -base64 32)"
echo ""

echo "REFRESH_TOKEN_SECRET=$(openssl rand -base64 32)"
echo ""

echo "ENCRYPTION_KEY=$(openssl rand -hex 16)"
echo ""

echo "POSTGRES_PASSWORD=$(openssl rand -base64 24)"
echo ""

echo "==========================================="
echo "✅ Copy these values to your .env.production file"
echo "⚠️  Never commit these secrets to Git!"
echo ""
