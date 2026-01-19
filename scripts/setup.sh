#!/bin/bash

# Setup script for Dashboard Admin E-commerce

echo "🚀 Dashboard Admin E-commerce - Setup Script"
echo "============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. Docker is recommended for easy setup."
    echo "   You can continue without Docker, but you'll need PostgreSQL and Redis installed locally."
    read -p "   Continue without Docker? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Docker version: $(docker --version)"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env.local ]; then
    echo ""
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created"
else
    echo ""
    echo "ℹ️  .env.local already exists"
fi

# Start Docker services if Docker is available
if command -v docker &> /dev/null; then
    echo ""
    read -p "🐳 Start Docker services now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 Starting Docker services..."
        docker-compose up -d
        echo ""
        echo "⏳ Waiting for services to be ready..."
        sleep 10
        echo "✅ Services started!"
    fi
fi

echo ""
echo "============================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Review and update .env.local if needed"
echo "  2. Run 'npm run dev' to start development server"
echo "  3. Open http://localhost:3000 in your browser"
echo "  4. Login with: admin@example.com / Admin123!"
echo ""
echo "📚 Read QUICKSTART.md for more information"
echo "============================================="
