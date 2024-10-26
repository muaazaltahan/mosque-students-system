<template>
  <div class="support-form">
    <h2>Connect With Us</h2>
    <p>If you have any issues or questions, feel free to reach out!</p>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Your Name</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          :class="{ error: errors.name }"
          placeholder=""
        />
        <p v-if="errors.name" class="error-message">Name is required.</p>
      </div>

      <div class="form-group">
        <label for="email">Your Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          :class="{ error: errors.email }"
          placeholder=""
        />
        <p v-if="errors.email" class="error-message">
          Valid email is required.
        </p>
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="formData.message"
          :class="{ error: errors.message }"
          placeholder=""
        ></textarea>
        <p v-if="errors.message" class="error-message">Message is required.</p>
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </form>

    <p v-if="submitStatus === 'success'" class="success-message">
      Your message has been sent!
    </p>
    <p v-if="submitStatus === 'error'" class="error-message">
      Failed to send your message. Please try again.
    </p>
  </div>
</template>

<script>
export default {
  name: "SupportForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
      errors: {
        name: false,
        email: false,
        message: false,
      },
      submitStatus: "", // 'success' or 'error' for message status
    };
  },
  methods: {
    validateForm() {
      this.errors.name = !this.formData.name;
      this.errors.email =
        !this.formData.email || !this.isValidEmail(this.formData.email);
      this.errors.message = !this.formData.message;

      return !this.errors.name && !this.errors.email && !this.errors.message;
    },
    isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailPattern.test(email);
    },
    handleSubmit() {
      if (this.validateForm()) {
        // Simulate form submission - Replace with actual API call
        this.submitStatus = "success";
        console.log("Form Submitted:", this.formData);

        // Reset form
        this.formData = {
          name: "",
          email: "",
          message: "",
        };
      } else {
        this.submitStatus = "error";
      }
    },
  },
};
</script>

<style scoped>
.support-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: var(--color--close-dark);
  border-radius: 10px;
}

h2 {
  margin-bottom: 10px;
  font-size: 24px;
  color: rgba(156, 163, 175, 1);
}

p {
  margin-bottom: 20px;
  color: rgba(156, 163, 175, 1);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: rgba(156, 163, 175, 1);
}

input,
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid rgba(55, 65, 81, 1);
  border-radius: 5px;
  box-sizing: border-box;
  background-color: var(--color--close-dark);
  color: #ffff;
}
textarea {
  height: 150px;
  resize: none;
}

input.error,
textarea.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 14px;
}

.success-message {
  color: green;
  font-size: 16px;
  margin-top: 20px;
}

/* this dont work whhy */
input:focus,
textarea:focus {
  border-color: var(--color-blue);
}
/*  */
.submit-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
