// Profiilimenüü avamine ja sulgemine.
const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");

if (profileButton && profileMenu) {
  profileButton.addEventListener("click", () => {
    profileMenu.hidden = !profileMenu.hidden;
    profileButton.setAttribute("aria-expanded", String(!profileMenu.hidden));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".profile")) {
      profileMenu.hidden = true;
      profileButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      profileMenu.hidden = true;
      profileButton.setAttribute("aria-expanded", "false");
    }
  });
}

// Ühe postituse HTML tehakse JSON-ist saadud andmete järgi.
function createPost(post) {
  const article = document.createElement("article");
  article.className = "post";

  const header = document.createElement("header");
  header.className = "post-header";

  const user = document.createElement("div");
  user.className = "post-user";

  const avatar = document.createElement("img");
  avatar.src = "assets/avatar.svg";
  avatar.alt = "User avatar";

  const author = document.createElement("span");
  author.textContent = post.author;
  user.append(avatar, author);

  const date = document.createElement("time");
  date.dateTime = post.createdAt;
  date.textContent = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });

  header.append(user, date);
  article.append(header);

  // Pilt lisatakse ainult siis, kui postitusel on image olemas.
  if (post.image) {
    const image = document.createElement("img");
    image.className = "post-image";
    image.src = post.image;
    image.alt = post.imageAlt || "Post image";
    article.append(image);
  }

  const text = document.createElement("p");
  text.textContent = post.text;
  article.append(text);

  const likeButton = document.createElement("button");
  likeButton.className = "like-button";
  likeButton.type = "button";
  likeButton.textContent = "♡ Like";
  likeButton.setAttribute("aria-pressed", "false");
  likeButton.addEventListener("click", () => {
    const liked = likeButton.classList.toggle("liked");
    likeButton.textContent = liked ? "♥ Liked" : "♡ Like";
    likeButton.setAttribute("aria-pressed", String(liked));
  });
  article.append(likeButton);

  return article;
}

async function loadPosts() {
  const feed = document.getElementById("posts");
  if (!feed) return;

  try {
    const response = await fetch("posts.json");
    if (!response.ok) throw new Error("Cannot load posts.json");

    const posts = await response.json();
    if (!Array.isArray(posts)) throw new Error("JSON must contain an array");

    // Add Post lehel tehtud postitused on salvestatud brauserisse.
    const savedPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
    feed.replaceChildren();
    [...savedPosts, ...posts].forEach((post) => feed.append(createPost(post)));
  } catch (error) {
    console.error(error);
    feed.textContent = "Posts could not be loaded. Please try again.";
  }
}

// Kuna brauser ei saa posts.json faili muuta, salvestame enda postitused localStorage'i.
const addPostForm = document.getElementById("addPostForm");
if (addPostForm) {
  addPostForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.getElementById("post-body").value.trim();
    if (!message) return;

    const file = document.getElementById("post-file").files[0];
    if (file && file.size > 1000000) {
      alert("Please select an image smaller than 1 MB.");
      return;
    }

    try {
      let image = null;
      if (file) {
        image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Cannot read image"));
          reader.readAsDataURL(file);
        });
      }

      const savedPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
      savedPosts.unshift({
        id: Date.now(),
        author: "PostIt User",
        createdAt: new Date().toISOString(),
        text: message,
        image: image,
        imageAlt: "Uploaded image"
      });
      localStorage.setItem("myPosts", JSON.stringify(savedPosts));
      window.location.href = "index.html";
    } catch (error) {
      console.error(error);
      alert("Post could not be saved.");
    }
  });
}

loadPosts();
