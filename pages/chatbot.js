import React from "react";
import { useRouter } from "next/router";

const FloatingChatbot = () => {
const router = useRouter();

// Function to handle chatbot input and routing to appropriate page
const handleInput = (input) => {
if (input === "About Us") {
router.push("/about");
} else if (input === "Contact Us") {
router.push("/contact");
} else if (input === "Product Catalog") {
router.push("/products");
} else {
alert("Invalid input. Please try again.");
}
};

return (
<div className="floating-chatbot">
<input
type="text"
placeholder="What can I help you with today?"
onSubmit={(e) => handleInput(e.target.value)}
/>
</div>
);
};

export default FloatingChatbot;