# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-app.spec.ts >> Blog Application >> Authentication >> login fails with wrong credentials
- Location: tests\blog-app.spec.ts:71:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('error-message')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('error-message') with timeout 5000ms
  - waiting for getByTestId('error-message')
  - Target page, context or browser has been closed

```

```yaml
- navigation:
  - link "home":
    - /url: /
  - text: "|"
  - link "blogs":
    - /url: /blogs
  - text: "|"
  - link "users":
    - /url: /users
  - text: "|"
  - link "login":
    - /url: /login
  - text: "|"
  - link "register":
    - /url: /register
- heading "Login" [level=2]
- text: Username
- textbox "Username": testuser
- text: Password
- textbox "Password": wrongpassword
- button "Login"
- alert
```

```
Error: browserContext._wrapApiCall: Target page, context or browser has been closed
```