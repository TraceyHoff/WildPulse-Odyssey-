python3 -m http.server 3000 &
SERVER_PID=$!
sleep 2
npx playwright test
kill $SERVER_PID
