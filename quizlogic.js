import {initAuthListener} from './isSignedIn.js';
import {auth, doc, setDoc, db} from "./firebaseInitializing.js?v=1.0";

initAuthListener();

const quizContainer = document.getElementById("quiz-container");

    const quizData = [
        {
            question: "What type of clothes do you usually wear?",
            answers: [{text: "Casual"},
            {text: "Sporty"},
            {text: "Formal"},
            {text: "Streetwear"}
            ]
            
        },
        {
            question: "What best describes your daily lifestyle?",
            answers: [{text: "Office"},
            {text: "School"},
            {text: "Active"},
            {text: "Homebody"}
            ]
        },
        {
            question: "What's your preferred fit?",
            answers: [{text: "Tight"},
            {text: "Tailored"},
            {text: "Relaxed"},
            {text: "Oversized"}
            ]
        },
        {
            question: "Which color palette do you usually wear?",
            answers: [{text: "Neutral"},
            {text: "Pastel"},
            {text: "Warm"},
            {text: "Bold & Bright"}
            ]
        }
    ];
    
    const quizAnswers = {};
    
    quizData.forEach((item, index) => {
        console.log(`Creating question ${index + 1}`);
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
    
        const h2 = document.createElement("h2");
        h2.textContent = `Question ${index + 1}: ${item.question}`;
        questionDiv.appendChild(h2);
    
        const answersDiv = document.createElement("div");
        answersDiv.classList.add("answers");
    
        item.answers.forEach(answer => {
    
            const btn = document.createElement("button");
            btn.textContent = answer.text;
    
            btn.addEventListener("click", () => {
                const allButtons = answersDiv.querySelectorAll("button");
                allButtons.forEach(b => b.classList.remove("selected")); //deselecting all the buttons in this answer group
    
                btn.classList.add("selected");
    
                quizAnswers[index] = answer.text;
                console.log(quizAnswers[index]);
            });
    
            answersDiv.appendChild(btn);
        });
    
        questionDiv.appendChild(answersDiv);
        quizContainer.appendChild(questionDiv);
    });
    
    async function logResults() {
    
        const user = auth.currentUser;
    
        if (!user) {
            alert("No user is logged in!");
            return;
        }

        if (Object.keys(quizAnswers).length !== quizData.length) {
            alert("Please answer all questions!");
            return;
        }
    
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                quizAnswers: quizAnswers
            }, { merge: true });
    
            alert("Quiz answers saved successfully! Redirecting to the menu page.");
            window.location.href = '/Main.html';
        } catch (error) {
            console.error("Error saving quiz answers: ", error);
            alert("Failed to save quiz answers.");
        }
    
    }
    
    document.getElementById("doneButton").addEventListener("click", logResults);