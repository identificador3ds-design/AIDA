import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; // ADICIONADO signIn...
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const signinForm = document.querySelector(".form.signin");
const signupForm = document.querySelector(".form.signup");
const cardBg1 = document.querySelector(".card-bg-1");
const cardBg2 = document.querySelector(".card-bg-2");

// Função visual
window.toggleView = () => {
  const signinActive = signinForm.classList.contains("active");
  signinForm.classList.toggle("active", !signinActive);
  signupForm.classList.toggle("active", signinActive);
  [cardBg1, cardBg2].forEach((el) => el.classList.toggle("signin", signinActive));
  [cardBg1, cardBg2].forEach((el) => el.classList.toggle("signup", !signinActive));
};

// Registro (Sign Up)
document.getElementById("btnRegister").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCredential.user.uid), {
      nome: name,
      email: email,
      createdAt: new Date()
    });
    alert("Conta criada com sucesso!");
  } catch (error) {
    alert("Erro ao cadastrar: " + error.message);
  }
});

// Login (Sign In)
document.getElementById("btnLogin").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Bem-vindo!");
  } catch (error) {
    alert("Erro ao logar: " + error.message);
  }
});