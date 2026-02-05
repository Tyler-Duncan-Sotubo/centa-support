---
title: Password reset link expired or invalid
sidebar_position: 1
---

This article explains why you may see an error when resetting your password and how to request a new reset link.

---

## Error messages you may see

You may see one of the following messages when opening a password reset link:

- **Token is not valid**
- **Token has already been used**
- **Token has expired**

When this happens, the reset link can no longer be used.

![Password reset token error with request new link button](/img/troubleshooting/password-reset-token-error.png)

---

## What this means

For security reasons, CentaHR password reset links are:

- **Time-limited**
- **Single-use**
- **Automatically invalidated** when a new reset link is requested

Once a token becomes invalid, it cannot be reused.

---

## Why this happens

### The reset link expired

Password reset links expire after a short time.

If you wait too long before opening the email, the token may expire.

---

### The reset link was already used

Each reset link can only be used **once**.

If you refreshed the page or clicked the link again after resetting your password, the link will no longer work.

---

### You requested another reset email

Requesting a new password reset email automatically invalidates **all previous reset links**.

Always use the **most recent email**.

---

### The link was opened on multiple devices or browsers

Opening the same reset link in multiple browsers or devices can invalidate the token.

---

## How to fix it

1. On the error screen, click **Request New Reset Link**.
2. You will be redirected to the **Forgot Password** page.
3. Enter your email address and submit the form.

![Forgot password page where users request a new reset link](/img/troubleshooting/forgot-password-page.png)

4. Open the **most recent** password reset email.
5. Click the new reset link and reset your password immediately.

---

## Tips to avoid this issue

- Use the reset link as soon as you receive it
- Avoid requesting multiple reset emails
- Do not open the reset link on multiple devices or browsers
- Complete the reset process in one session

---

## When to contact support

Contact your admin or support team if:

- You continue to see the error after requesting a new link
- You are unsure which email address is linked to your account
- You do not receive reset emails

---

## Related articles

- Didn’t receive password reset email
- Can’t log in to CentaHR
