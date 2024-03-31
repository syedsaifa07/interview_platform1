# Interview Platform

Submission for Unstop Talent Park - Tech Challenge:
Video chat application built using WebRTC and Socket.IO. It allows users(interviewer and interviewee) to create or join rooms and have video conversations including a p2p code editor for coding assesments.

## Tech Stack

**Client:** React.js,
Chakra UI,
Socket.IO Client,
Yjs,
Axios,
SyncedStore

**Server:** Node.js
Socket.IO


## Run Locally

Clone the project:

```bash
  git clone https://github.com/shivam-bhushan/interview_platform1.git
```


Install backend dependencies:

```bash
  cd backend && npm install
```

Install frontend dependencies:

```bash
  cd frontend && npm install
```

Start the server:

```bash
  npm start
```

Start the client:

```bash
  npm run dev
```

Once the client opens:

- Open 2 seperate instances of client
- In the first instance
    - Enter email
    - Enter room number (eg. 1)
    - Hit "Join" button
- In the second instance:
    - Enter another email
    - Enter same room number
    - Hit "Join" button
- Once second instance joins, click "Call" button in the first instance
- Then click "Send Stream" button in the second instance
- Voilà! both peers are connected
- Now you can use the code editor and the run the output and they will run in sync as well

## Run On CodeSandbox

1. Go to https://github.com/shivam-bhushan/interview_platform1.git and fork repo
2. Open codesandbox.io and login with github (authorise access to your public repos when asked)
3. Click on "Repository" button on the top right of CodeSandbox dashboard
4. Click on "interview_platform1" (the repo you forked)
5. Open Terminal instace run:
```bash
  cd backend && npm install

```
Then:
```bash
  npm start

```
6. This will open a tab on the right. Copy the web address of the tab (eg. https://9pyhpn-8000.csb.app)

7. From file explorer on the left, open "/frontend/src/context/SocketProvider" and paste the web address in place of "http://localhost:8000" and save file

6. Open another terminal
```bash
  cd frontend && npm install
```

Start the client:

```bash
  npm run dev
```

Once you open the client:

- Open 2 seperate instances of client
- In the first instance
    - Enter email
    - Enter room number (eg. 1)
    - Hit "Join" button
- In the second instance:
    - Enter another email
    - Enter same room number
    - Hit "Join" button
- Once second instance joins, click "Call" button in the first instance
- Then click "Send Stream" button in the second instance
- Voilà! both peers are connected
- Now you can use the code editor and the run the output and they will run in sync as well
