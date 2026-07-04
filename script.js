/* =========================================================
   SITES BY MAX: quiz flow, forms, reveals
   ========================================================= */

const WEB3FORMS_KEY = "56f08e83-dc6c-4f55-8520-8ddd4957a587";

/* ---------- quiz ---------- */

const quiz = document.getElementById("quiz");
const dots = document.getElementById("quizDots");
const answers = { name: "", business: "", phone: "", notes: "", email: "" };

const QUESTION_ORDER = ["name", "business", "phone", "notes", "email"];

const BACK_TARGETS = {
  name: "opener",
  business: "name",
  phone: "business",
  notes: "phone",
  email: "notes",
};

const backBtn = document.getElementById("quizBack");

function showStep(id) {
  quiz.querySelectorAll(".quiz-step").forEach((s) => s.classList.remove("is-active"));
  const step = quiz.querySelector(`[data-step="${id}"]`);
  step.classList.add("is-active");

  backBtn.hidden = !(id in BACK_TARGETS);

  const qIndex = QUESTION_ORDER.indexOf(id);
  dots.classList.toggle("is-visible", qIndex > -1);
  if (qIndex > -1) {
    dots.querySelectorAll("span").forEach((d, i) => d.classList.toggle("is-done", i <= qIndex));
    const input = step.querySelector("input");
    if (input) setTimeout(() => input.focus(), 120);
  }

  if (id === "business") {
    document.getElementById("qBusinessLabel").textContent = answers.name
      ? `What kind of business do you run, ${answers.name}?`
      : "What kind of business do you run?";
  }
}

function dismissQuiz(scrollToWork = false) {
  sessionStorage.setItem("sbm_quiz_done", "1");
  quiz.classList.add("is-dismissed");
  document.body.classList.remove("quiz-open");
  if (scrollToWork) {
    setTimeout(() => document.getElementById("work").scrollIntoView({ behavior: "smooth" }), 350);
  }
  setTimeout(() => quiz.remove(), 900);
}

function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function validPhone(v) {
  const digits = v.replace(/\D/g, "");
  return /^[0-9()+\-.\s]+$/.test(v) && digits.length >= 7 && digits.length <= 15;
}

function revealReturningNote() {
  const returningNote = document.getElementById("contactReturningNote");
  if (returningNote) returningNote.hidden = false;
}

function submitQuizLead() {
  sessionStorage.setItem("sbm_quiz_lead", "1");
  revealReturningNote();

  const line = document.getElementById("qDoneLine");
  line.textContent = answers.name ? `Talk soon, ${answers.name}.` : "Talk soon.";
  showStep("done");

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Quiz lead: ${answers.name || "someone"} (${answers.business || "unknown business"})`,
      from_name: "Sites by Max quiz",
      name: answers.name,
      business: answers.business,
      phone: answers.phone,
      message: answers.notes,
      email: answers.email,
    }),
  }).catch(() => {
    /* the visitor still gets the site either way */
  });

  setTimeout(() => dismissQuiz(true), 1100);
}

function advanceFrom(stepId) {
  if (stepId === "name") {
    answers.name = document.getElementById("qName").value.trim();
    showStep("business");
  } else if (stepId === "business") {
    answers.business = document.getElementById("qBusiness").value.trim();
    showStep("phone");
  } else if (stepId === "phone") {
    const v = document.getElementById("qPhone").value.trim();
    const err = document.getElementById("qPhoneError");
    if (!validPhone(v)) {
      err.hidden = false;
      return;
    }
    err.hidden = true;
    answers.phone = v;
    showStep("notes");
  } else if (stepId === "notes") {
    answers.notes = document.getElementById("qNotes").value.trim();
    showStep("email");
  } else if (stepId === "email") {
    const v = document.getElementById("qEmail").value.trim();
    const err = document.getElementById("qEmailError");
    if (!validEmail(v)) {
      err.hidden = false;
      return;
    }
    err.hidden = true;
    answers.email = v;
    submitQuizLead();
  }
}

function initQuiz() {
  if (sessionStorage.getItem("sbm_quiz_done")) {
    document.body.classList.add("quiz-done");
    quiz.remove();
    return;
  }

  document.body.classList.add("quiz-open");

  quiz.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.dataset.action;
    const stepEl = btn.closest(".quiz-step") || quiz.querySelector(".quiz-step.is-active");
    const step = stepEl.dataset.step;

    if (action === "yes") showStep("name");
    if (action === "no") showStep("sure");
    if (action === "relent") dismissQuiz();
    if (action === "still-no") {
      showStep("fair");
      setTimeout(() => dismissQuiz(), 1600);
    }
    if (action === "back") {
      const prev = BACK_TARGETS[step];
      if (prev) showStep(prev);
    }
    if (action === "next" || action === "finish") advanceFrom(step);
    if (action === "skip-field") {
      if (step === "phone") {
        answers.phone = "";
        document.getElementById("qPhoneError").hidden = true;
        showStep("notes");
      } else if (step === "notes") {
        answers.notes = "";
        showStep("email");
      }
    }
  });

  quiz.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName === "INPUT") {
      e.preventDefault();
      advanceFrom(e.target.closest(".quiz-step").dataset.step);
    }
  });

  document.getElementById("quizSkip").addEventListener("click", () => dismissQuiz());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !quiz.classList.contains("is-dismissed")) dismissQuiz();
  });
}

initQuiz();

if (sessionStorage.getItem("sbm_quiz_lead")) revealReturningNote();

/* ---------- contact form ---------- */

const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (form.querySelector(".hp").checked) return; // honeypot

  if (!form.reportValidity()) return;

  const btn = document.getElementById("contactSubmit");
  btn.disabled = true;
  btn.textContent = "Sending…";
  note.textContent = "";

  const data = Object.fromEntries(new FormData(form).entries());
  delete data.botcheck;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Website inquiry: ${data.name} (${data.business})`,
        from_name: "Sites by Max contact form",
        ...data,
      }),
    });
    const out = await res.json();

    if (out.success) {
      form.reset();
      note.textContent = "Got it. I'll get back to you soon, usually the same day.";
      btn.textContent = "Sent";
    } else {
      throw new Error(out.message || "send failed");
    }
  } catch (err) {
    note.textContent = "Hmm, that didn't send. Mind trying again in a minute?";
    btn.disabled = false;
    btn.textContent = "Send it over";
  }
});

/* ---------- scroll reveals ---------- */

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

/* ---------- footer year ---------- */

document.getElementById("year").textContent = new Date().getFullYear();
