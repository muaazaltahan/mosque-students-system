<template>
  <div class="title">
    <h1 class="line">تواصل معنا</h1>
    <p class="line">
      إذا كانت لديك أي مشاكل أو أسئلة، فلا تتردد في التواصل معنا
    </p>
  </div>

  <div class="support-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">العنوان</label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          :class="{ error: errors.title }"
          placeholder=""
        />
        <p v-if="errors.title" class="error-message">العنوان مطلوب.</p>
      </div>
      <div class="form-group">
        <label for="phone">رقم الجوال</label>
        <input
          type="text"
          id="phone"
          v-model="formData.phone"
          :class="{ error: errors.phone }"
          placeholder=""
        />
        <p v-if="errors.phone" class="error-message">
          رقم الجوال مطلوب ويجب أن يكون رقم.
        </p>
      </div>

      <div class="form-group">
        <label for="emailAddress">الإيميل</label>
        <input
          type="email"
          id="emailAddress"
          v-model="formData.emailAddress"
          :class="{ error: errors.emailAddress }"
          placeholder="مثل 'ex@gmail.com'"
        />
        <p v-if="errors.emailAddress" class="error-message">
          عنوان بريد إلكتروني صالح مطلوب.
        </p>
      </div>

      <div class="form-group">
        <label for="description">الرسالة</label>
        <textarea
          id="description"
          v-model="formData.description"
          :class="{ error: errors.description }"
          placeholder=""
        ></textarea>
        <p v-if="errors.description" class="error-message">
          الرسالة مطلوبة ويجب أن تحتوي على أكثر من 10 أحرف و أقل من 500 حرف.
        </p>
      </div>
      <button type="submit" class="submit-button">إرسال</button>
    </form>

    <p v-if="submitStatus === 'success'" class="success-message">
      لقد تم الإرسال بنجاح
    </p>
    <p v-if="submitStatus === 'error'" class="error-message">
      .فشل إرسال المشكلة الخاص بك. يرجى المحاولة مرة أخرى
    </p>
    <div class="center-load" v-if="isLoading">
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupportForm",
  data() {
    return {
      formData: {
        title: "",
        emailAddress: "",
        description: "",
        phone: "",
        isDone: false,
        createdAt: new Date(),
      },
      errors: {
        title: false,
        emailAddress: false,
        description: false,
        phone: false,
      },
      submitStatus: "", // 'success' or 'error' for description status
      isLoading: false,
    };
  },
  methods: {
    validateForm() {
      this.errors.title = !this.formData.title;
      this.errors.phone = !this.formData.phone || isNaN(this.formData.phone);
      this.errors.emailAddress =
        !this.formData.emailAddress ||
        !this.isValidEmail(this.formData.emailAddress);
      this.errors.description =
        !this.formData.description ||
        !(this.formData.description.length > 10) ||
        !(this.formData.description.length < 500);
      return (
        !this.errors.title &&
        !this.errors.phone &&
        !this.errors.emailAddress &&
        !this.errors.description
      );
    },
    isValidEmail(emailAddress) {
      const emailAddressPattern =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailAddressPattern.test(emailAddress);
    },
    async handleSubmit() {
      if (this.validateForm()) {
        this.isLoading = true;
        try {
          const response = await fetch(
            "https://muaazaltahan-001-site1.dtempurl.com/api/Support",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.formData),
            }
          );

          if (response.ok) {
            this.submitStatus = "success";
            this.formData = {
              title: "",
              emailAddress: "",
              description: "",
              phone: "",
              isDone: false,
              createdAt: new Date(),
            };
          } else {
            this.submitStatus = "error";
            console.error("Submission failed:", response.statusText);
          }
        } catch (error) {
          this.submitStatus = "error";
          console.error("Submission failed:", error);
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.support-form {
  max-width: 600px;
  margin: 10px auto;
  background-color: var(--color--close-dark);
  border-radius: 10px;
  padding-right: 20px;
}
.title {
  text-align: center;
  padding-top: 4px;
  direction: rtl;
}
h1 {
  color: white;
  display: inline;
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 8px;
}

@media (min-width: 768px) {
  .line {
    display: inline;
  }
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
  direction: rtl;
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
  direction: rtl;
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
  margin-top: 20px;
  color: red;
  font-size: 14px;
  direction: rtl;
}

.success-message {
  color: green;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  direction: rtl;
  text-align: center;
}

input:focus,
input:focus-visible,
textarea:focus {
  border-color: var(--color-blue);
  outline: none;
}
/*  */
.submit-button {
  margin-left: calc(100% - 71px);
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
/* isLoading */
.center-load {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
svg {
  width: 3.25em;
  transform-origin: center;
  animation: rotate4 2s linear infinite;
}

circle {
  fill: none;
  stroke: hsl(214, 97%, 59%);
  stroke-width: 2;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash4 1.5s ease-in-out infinite;
}

@keyframes rotate4 {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash4 {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dashoffset: -125px;
  }
}
</style>
