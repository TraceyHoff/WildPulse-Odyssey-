const { chromium } = require('playwright');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");
const http = require('http');

async function run() {
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);
    app.use(express.static(path.join(__dirname, '/')));
    server.listen(3000);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err));

    await page.goto('http://localhost:3000/');
    await page.waitForTimeout(5000); // Wait for preload/create

    await browser.close();
    server.close();
}
run();