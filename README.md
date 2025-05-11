<p align="center">
  <a href="https://nextjs.org/" target="_blank" style="display: inline-block; margin-right: 20px;">
    <img src="https://raw.githubusercontent.com/BesmaSmile/flex-flex-web-app/refs/heads/master/public/nextjsicon.svg" height="60" alt="Next.js N Logo" />
  </a>
  <a href="https://flex-flex-web-app.vercel.app/movies" target="_blank" style="display: inline-block;">
    <img src="https://raw.githubusercontent.com/BesmaSmile/flex-flex-web-app/refs/heads/master/src/assets/img/app-name.svg" height="60" alt="App Name" />
  </a>
</p>

# Flix Flex 🎬

Flix Flex is a modern [Next.js](https://nextjs.org) application bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), built for exploring movie content in a clean, flexible UI.

## 🔗 Demo

👉 [Live Demo](https://flex-flex-web-app.vercel.app)
(Username: samara - Password: samara)

## 🧩 Related Project

👉 This frontend app connects to the [Flix Flex API (Backend)](https://github.com/BesmaSmile/flix-flex-api)


## 🚀 Getting Started Locally

To run the app locally, follow these steps:

1. **Install dependencies**:

```bash
npm install
# or
yarn install
```

2. **Create an `.env` file** based on `.env.example`:

```bash
cp .env.example .env
```

3. **Edit the `.env` file** and make sure it contains:

```
NEXT_PUBLIC_API_URL=https://flix-flex-api-production.up.railway.app/api
NEXT_PUBLIC_IMG_URL=https://image.tmdb.org/t/p/w500
```

4. **Start the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.


## 🐳 Run with Docker

To run the app using Docker:

1. **Build the Docker image**:

```bash
docker build -t flix-flex .
```

2. **Run the container**:

```bash
docker run -p 3000:3000 flix-flex
```

Then visit: [http://localhost:3000](http://localhost:3000)

> Make sure port `3000` is available and not used by another app.

---

## 📦 Docker Hub Image

You can also pull and run the pre-built image directly from Docker Hub:

```bash
docker pull besmarabiacherif/flix-flex:nextJs
docker run -p 3000:3000 besma/flix-flex:nextJs
```

🔗 [View on Docker Hub](https://hub.docker.com/r/besmarabiacherif/flix-flex)

---

## 📚 Learn More

To learn more about Next.js, check out:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

---
## 👤 Author

Made with ❤️ by [Besma RABIA CHERIF](https://www.linkedin.com/in/besmarabiacherif/).