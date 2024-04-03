# Interview Platform

Submission for Unstop Talent Park - Tech Challenge (Problem Statement 2):
<br/>
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

## Run On StackBlitz

1. Go to https://stackblitz.com/~/github.com/shivam-bhushan/interview_platform1 
2. Open Terminal instace and run:
```bash
  cd backend && npm install

```
Then:
```bash
  npm start

```

3. Open another terminal
```bash
  cd frontend && npm install
```

4. Start the client:

```bash
  npm run dev
```

5. Once you open the client:

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
