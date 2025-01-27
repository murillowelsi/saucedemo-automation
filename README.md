# 🧪 SauceDemo Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-1.42.0-blue?logo=playwright)](https://playwright.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI/CD](https://github.com/yourusername/saucedemo-automation/actions/workflows/main.yml/badge.svg)](https://github.com/yourusername/saucedemo-automation/actions)

A robust test automation framework for SauceDemo e-commerce platform using Playwright and TypeScript, following OOP and SOLID principles.

## 🚀 Features

- **OOP Approach**: Page Object Model with inheritance
- **SOLID Principles**: Clean, maintainable architecture
- **Playwright Fixtures**: Efficient test setup/teardown
- **Environment Management**: Dotenv integration
- **Visual Testing**: Layout and component validation
- **CI/CD Ready**: GitHub Actions integration
- **Cross-Browser**: Chromium, Firefox, Webkit support
- **Parallel Execution**: Faster test runs

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Reporting](#-reporting)
- [CI/CD](#-cicd)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠️ Prerequisites

- Node.js 16+
- npm 9+
- Playwright 1.42+

## 📥 Installation

1. Clone repository:

   ```bash
   git clone https://github.com/yourusername/saucedemo-automation.git
   cd saucedemo-automation
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install --with-deps
   ```

## ⚙️ Configuration

1. Create `.env` file from template:

   ```bash
   cp .env.example .env
   ```

2. Update environment variables:

   ```ini
   BASE_URL=https://www.saucedemo.com
   STANDARD_USER_USERNAME=standard_user
   STANDARD_USER_PASSWORD=secret_sauce
   LOCKED_OUT_USER=locked_out_user
   CHECKOUT_USER_FIRSTNAME=Test
   CHECKOUT_USER_LASTNAME=User
   CHECKOUT_USER_ZIPCODE=12345
   ```

## ▶️ Running Tests

**All tests:**

```bash
npx playwright test
```

## 🔄 CI/CD

Pre-configured GitHub Actions workflow:

- Runs on push to main/master
- Executes all tests
- Uploads HTML report as artifact
- Environment variables pre-configured

## 📁 Project Structure

```bash
saucedemo-automation/
├── src/
│   ├── config/          # Test fixtures & environment
│   ├── pages/           # Page Object Models
│   ├── tests/           # Test specifications
│   └── utils/           # Helper functions
├── .github/             # CI/CD workflows
├── assets/              # Documentation assets
├── .env.example         # Environment template
├── playwright.config.ts # Test configuration
└── package.json         # Dependencies
```
