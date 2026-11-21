# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: blog-app.spec.ts >> Blog Application >> Authentication >> registration fails with mismatched passwords
- Location: tests\blog-app.spec.ts:42:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('passwordConfirm-error')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('passwordConfirm-error') with timeout 5000ms
  - waiting for getByTestId('passwordConfirm-error')
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
- heading "Register" [level=2]
- text: Username
- textbox "Username": testuser
- text: Name
- textbox "Name": Test User
- text: Password
- textbox "Password": testpass123
- text: Confirm Password
- textbox "Confirm Password": differentpass
- button "Register"
- alert
```

```
Error: browserContext._wrapApiCall: Target page, context or browser has been closed
```