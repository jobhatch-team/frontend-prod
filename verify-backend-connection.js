#!/usr/bin/env node

/**
 * JobHatch Backend Connection Verification Script
 * 
 * This script tests all critical API endpoints to ensure the backend is working
 * and accessible from the frontend.
 */

const https = require('https');
const http = require('http');

// Configuration
const BACKEND_URL = 'https://backend-prod-team-jobhatchs-projects.vercel.app';
const ALTERNATIVE_URL = 'https://backend-prod-jobhatch-team-team-jobhatchs-projects.vercel.app';

// Test endpoints
const ENDPOINTS = [
    { name: 'Health Check', path: '/api/health', critical: true },
    { name: 'Waitlist', path: '/api/waitlist', critical: true },
    { name: 'Jobs', path: '/api/jobs', critical: true },
    { name: 'Auth', path: '/api/auth', critical: false },
    { name: 'Onboarding', path: '/api/onboarding', critical: false },
    { name: 'Profiles', path: '/api/profiles', critical: false },
    { name: 'Resumes', path: '/api/resumes', critical: false },
    { name: 'AI', path: '/api/ai', critical: false },
    { name: 'API Docs', path: '/api/docs', critical: false },
    { name: 'Deployment Test', path: '/api/deployment-test', critical: true }
];

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
};

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const isHttps = url.startsWith('https');
        const client = isHttps ? https : http;
        
        const req = client.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                
                try {
                    const jsonData = JSON.parse(data);
                    resolve({
                        success: true,
                        status: res.statusCode,
                        data: jsonData,
                        responseTime: responseTime,
                        headers: res.headers
                    });
                } catch (e) {
                    resolve({
                        success: res.statusCode >= 200 && res.statusCode < 300,
                        status: res.statusCode,
                        data: data,
                        responseTime: responseTime,
                        headers: res.headers
                    });
                }
            });
        });
        
        req.on('error', (err) => {
            reject({
                success: false,
                error: err.message,
                responseTime: Date.now() - startTime
            });
        });
        
        req.setTimeout(10000, () => {
            req.abort();
            reject({
                success: false,
                error: 'Request timeout',
                responseTime: 10000
            });
        });
    });
}

async function testEndpoint(baseUrl, endpoint) {
    const url = `${baseUrl}${endpoint.path}`;
    
    try {
        const result = await makeRequest(url);
        return {
            ...result,
            endpoint: endpoint.name,
            url: url,
            critical: endpoint.critical
        };
    } catch (error) {
        return {
            ...error,
            endpoint: endpoint.name,
            url: url,
            critical: endpoint.critical
        };
    }
}

function printResult(result) {
    const icon = result.success ? '✅' : '❌';
    const color = result.success ? colors.green : colors.red;
    const criticalText = result.critical ? ' (CRITICAL)' : '';
    
    console.log(`${color}${icon} ${result.endpoint}${criticalText}${colors.reset}`);
    console.log(`   URL: ${result.url}`);
    console.log(`   Status: ${result.status || 'ERROR'}`);
    console.log(`   Time: ${result.responseTime}ms`);
    
    if (result.success && result.data) {
        if (typeof result.data === 'object') {
            console.log(`   Response: ${JSON.stringify(result.data).substring(0, 100)}...`);
        } else {
            console.log(`   Response: ${result.data.substring(0, 100)}...`);
        }
    } else if (result.error) {
        console.log(`   Error: ${result.error}`);
    }
    
    console.log('');
}

async function testBackend(baseUrl) {
    console.log(`${colors.blue}Testing Backend: ${baseUrl}${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    
    const results = [];
    
    for (const endpoint of ENDPOINTS) {
        const result = await testEndpoint(baseUrl, endpoint);
        results.push(result);
        printResult(result);
    }
    
    return results;
}

function printSummary(results, backendUrl) {
    const total = results.length;
    const passed = results.filter(r => r.success).length;
    const failed = total - passed;
    const criticalFailed = results.filter(r => r.critical && !r.success).length;
    
    console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    console.log(`${colors.white}SUMMARY FOR: ${backendUrl}${colors.reset}`);
    console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
    console.log(`Total Tests: ${total}`);
    console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
    console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
    console.log(`${colors.yellow}Critical Failures: ${criticalFailed}${colors.reset}`);
    console.log(`Success Rate: ${Math.round((passed / total) * 100)}%`);
    
    if (criticalFailed > 0) {
        console.log(`${colors.red}⚠️  CRITICAL ENDPOINTS FAILED! Frontend may not work properly.${colors.reset}`);
    } else {
        console.log(`${colors.green}🎉 All critical endpoints working! Frontend should work correctly.${colors.reset}`);
    }
    
    console.log('');
}

async function main() {
    console.log(`${colors.cyan}🚀 JobHatch Backend Connection Verification${colors.reset}`);
    console.log(`${colors.cyan}============================================${colors.reset}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('');
    
    // Test primary backend
    const primaryResults = await testBackend(BACKEND_URL);
    printSummary(primaryResults, BACKEND_URL);
    
    // Test alternative backend if primary has issues
    const criticalFailures = primaryResults.filter(r => r.critical && !r.success).length;
    if (criticalFailures > 0) {
        console.log(`${colors.yellow}Testing alternative backend due to critical failures...${colors.reset}`);
        console.log('');
        const alternativeResults = await testBackend(ALTERNATIVE_URL);
        printSummary(alternativeResults, ALTERNATIVE_URL);
    }
    
    console.log(`${colors.cyan}Verification complete!${colors.reset}`);
    console.log(`${colors.white}Next steps:${colors.reset}`);
    console.log(`1. If all critical tests pass, deploy your frontend`);
    console.log(`2. If critical tests fail, redeploy the backend`);
    console.log(`3. Test the frontend after deployment`);
    console.log('');
}

// Run the script
main().catch(console.error); 