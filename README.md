# 🎬 Flix-Flex

Flix-Flex is a modern web application built with React, allowing users to browse and discover movies and TV shows.
---

## 🚀 Key Features

- 🎞️ Browse movies and TV shows by categories
- 🔍 Dynamic search
- 🗂️ Detailed pages (description, ratings, visuals, etc.)
- ❤️ Add to favorites
- 🔄 Infinite scrolling and pagination

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## 🛠️ Main Libraries Used

- **Redux & Redux Thunk** 
- **Redux Persist** 
- **Formik + Yup**
- **Moment.js** 
- **Bootstrap** 

---

## 🧑‍💻 Running the Application

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

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


---

## 📦 Docker Hub Image

You can also pull and run the pre-built image directly from Docker Hub:

```bash
docker pull besmarabiacherif/flix-flex:react
docker run -p 3000:3000 besma/flix-flex:react
```

🔗 [View on Docker Hub](https://hub.docker.com/r/besmarabiacherif/flix-flex)

---
