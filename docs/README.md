## AWS Serverless Lambda Configuration

This contains the 2 files required for configuration your own instance of the `serverless-sandbox` AWS Serverless Lambda IAM account I currently have so you have run the software locally, if you choose to. Though, that is not required.

---

### Files

- `serverless-sandbox.config.conf`
    - Should have its contents appended to `${HOME}/.aws/config`.
- `serverless-sandbox.credentials.conf`
    - Should have its contents appended to `${HOME}/.aws/credentials`.

---

### Local Setup

- Once in place, you will have to update the `API_HOST_LOCAL` environment variable in `src/wmi/.env`.
- Add the `serverless-offline` path, when you run it to, as the host for that variable.

---
